const LOAD = "listings/LOAD";
const LOAD_ONE = 'listings/LOAD_ONE';
const ADD_ONE = 'listings/ADD_ONE';
const EDIT_LISTING = 'listings/EDIT_LISTING';
const DELETE_LISTING = "listings/DELETE_LIST";

const loadListings = listings => ({
    type: LOAD,
    listings
})

const loadOne = (listing) => {
    return {
        type: LOAD_ONE,
        listing
    }
};

const addNewListing = listing => ({
    type: ADD_ONE,
    listing
})

const editListing = (listing) => ({
    type: EDIT_LISTING,
    listing
})

const deleteListing = (listing) => {
    return {
        type: DELETE_LISTING,
        listing
    }
}

export const getListings = () => async dispatch => {
    const response = await fetch(`/api/browse/`)

    if (response.ok) {
        const listings = await response.json();
        dispatch(loadListings(listings));
        return listings
    }
}

export const getOneListing = (id) => async (dispatch) => {
    const response = await fetch(`/api/browse/${id}`);
    if (response.ok) {
        const listing = await response.json();
        dispatch(loadOne(listing));
    }
};

export const postListing = (user_id, title, url, description) => async dispatch => {
    const response = await fetch(`/api/browse/listing-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id,
            title,
            url,
            description
        })
    });

    if (response.ok) {
        const listing = await response.json();
        dispatch(addNewListing(listing));
        return listing;
    }
}

export const editingListing = (id, title, user_id) => async dispatch => {
    // console.log("FROM EDIT THUNK", typeof (+id))
    const response = await fetch(`/api/browse/${+id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            user_id
        })
    });

    if (response.ok) {
        const edited_listing = await response.json();
        dispatch(editListing(edited_listing));
        return edited_listing;
    }
}

export const deleteListings = (id) => async (dispatch) => {
    const response = await fetch(`/api/browse/${+id}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const deleted_listing = await response.json()

        dispatch(deleteListing(deleted_listing))
        return deleted_listing
    }
}

const initialState = {

}

const listingsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD: {
            newState = {}
            action.listings.forEach((listing) => {
                newState[listing.id] = listing
            })
            return { ...newState }
        }
        // case LOAD: {
        //     return {
        //         ...state,
        //         main_listings: [...action.listings]
        //     }
        // }
        case LOAD_ONE: {
            if (state[action.listing.id]) {
                const newState = {
                    ...state,
                    [action.listing.id]: action.listing
                };

                return newState
            }
            return {
                ...state,
                [action.listing.id]: {
                    ...state[action.listing.id],
                    ...action.listing
                }
            }
        }
        case ADD_ONE: {
            return {
                ...state,
                [action.listing.id]: {
                    ...newState[action.listing.id],
                    ...action.listing
                }
            }
        }
        case EDIT_LISTING: {
            newState = action.listing
        }
        case DELETE_LISTING: {
            delete newState[action.listing.id];
            return newState
        }

        default: return state;
    }
}

export default listingsReducer;
