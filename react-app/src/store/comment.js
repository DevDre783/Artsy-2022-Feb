const LOAD = "comments/LOAD";


const loadComments = comments => ({
    type: LOAD,
    comments
})

export const getListingComments = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`)

    if (response.ok) {
        const listing_comments = await response.json();
        dispatch(loadComments(listing_comments));
        return listing_comments;
    }
}

const initialState = {

}

const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD: {
            newState = {}
            action.comments.forEach((comment) => {
                newState[comment.id] = comment
            })
            return { ...newState }
        }
        // case ADD_ONE: {
        //     return {
        //         ...state,
        //         [action.listing.id]: {
        //             ...newState[action.listing.id],
        //             ...action.listing
        //         }
        //     }
        // }
        // case EDIT_LISTING: {
        //     newState = action.listing
        // }
        // case DELETE_LISTING: {
        //     delete newState[action.listing.id];
        //     return newState
        // }

        default: return state;
    }
}

export default commentsReducer;
