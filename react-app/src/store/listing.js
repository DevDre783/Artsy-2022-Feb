const LOAD = "listings/LOAD";
const LOAD_ONE = 'listings/LOAD_ONE';
const ADD_ONE = 'listings/ADD_ONE';

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
        headers: {'Content-Type': 'application/json'},
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

const initialState = {

}

const listingsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                main_listings: [...action.listings]
            }
        }
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
            // const new_listing = {
            //     id: action.listing.id,
            //     title: action.listing.title,
            //     url: action.listing.url,
            //     description: action.listing.description
            // }
            return {
                ...state,
                [action.listing.id]: {
                    ...newState[action.listing.id],
                    ...action.listing
                }
            }
        }
        default: return state;
    }
}

export default listingsReducer;
