const LOAD_ALL = "users/LOAD_ALL"

const load = list => ({
    type: LOAD_ALL,
    list
})


export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/users/`)

    if (response.ok) {
        const list = await response.json()
        dispatch(load(list))
    }
}


const initialState = {

}

const userReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_ALL: {
            newState = {}
            action.list.forEach((user) => {
                newState[user.id] = user
            })
            return { ...newState }
        }

        default: return state
    }
}

export default userReducer
