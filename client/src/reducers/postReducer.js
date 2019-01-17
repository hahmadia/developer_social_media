import { GET_PROFILES, POST_LOADING, GET_POSTS, GET_POST, ADD_POST, DELETE_POST } from '../actions/types';
const initialState = {
    post: {},
    posts: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        default:
            return state;
    }
}