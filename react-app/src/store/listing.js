const LOAD = "listings/LOAD";
const ADD_ONE = 'listings/ADD_ONE';

const loadListings = listings => ({
    type: LOAD,
    listings
})

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

export const postListing = (id, title, description, url) => async dispatch => {
    const response = await fetch(`/api/browse/listing-form`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
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
        case ADD_ONE: {
            const new_listing = {
                id: action.listing.id,
                title: action.listing.title,
                description: action.listing.description,
                url: action.listing.url
            }
            return {
                ...state,
                [action.listing.id]: new_listing,
                all_listings: [new_listing, ...state.all_listings]
                }
        }
        default: return state;
    }
}

export default listingsReducer;
