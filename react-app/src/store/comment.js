const LOAD = "comments/LOAD";
const ADD_ONE = 'comments/ADD_ONE';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';


const loadComments = comments => ({
    type: LOAD,
    comments
})

const addNewComment = comment => ({
    type: ADD_ONE,
    comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const getListingComments = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`)

    if (response.ok) {
        const listing_comments = await response.json();
        dispatch(loadComments(listing_comments));
        return listing_comments;
    }
}

export const postComment = (user_id, listing_id, body) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id,
            listing_id,
            body
        })
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(addNewComment(comment));
        return comment;
    }
}

export const editingComment = (id, body) => async dispatch => {
    // console.log("FROM EDIT THUNK", typeof (+id))
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            body
        })
    });

    if (response.ok) {
        const edited_comment = await response.json();
        console.log("FROM EDIT THUNK", edited_comment)
        dispatch(editComment(edited_comment));
        return edited_comment;
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
        case ADD_ONE: {
            return {
                ...state,
                [action.comment.id]: {
                    ...newState[action.comment.id],
                    ...action.comment
                }
            }
        }
        case EDIT_COMMENT: {
            newState = action.comment
        }
        // case DELETE_LISTING: {
        //     delete newState[action.listing.id];
        //     return newState
        // }

        default: return state;
    }
}

export default commentsReducer;
