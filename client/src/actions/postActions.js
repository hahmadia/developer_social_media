import axios from 'axios';
import {
    ADD_POST,
    GET_ERRORS,
    RESET_ERRORS,
    GET_POSTS,
    POST_LOADING,
    GET_POST
} from './types';

// Add post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    axios
        .get('/api/posts')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
}

// Get posts
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading);
    axios
        .get(`/api/posts/${id}`)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
}


// Delete post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Remove like
export const removeLike = id => dispatch => {
    axios
        .delete(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => {
            dispatch(getPost(postId));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add Comment
export const removeComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => {
            dispatch(getPost(postId));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const clearErrors = () => {
    return ({
        type: RESET_ERRORS
    });
}

// Set loading state 

export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}