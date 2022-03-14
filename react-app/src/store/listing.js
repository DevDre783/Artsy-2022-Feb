const LOAD = "listings/LOAD";

const loadListings = listings => ({
    type: LOAD,
    listings
})

export const getListings = () => async dispatch => {
    const response = await fetch(`/api/browse/`)

    if (response.ok) {
        const listings = await response.json();
        dispatch(loadListings(listings));
        return listings
    }
}

const initialState = {
  
}

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                main_listings: [...action.listings]
            }
        }
        default: return state;
    }
}

export default listingsReducer;
