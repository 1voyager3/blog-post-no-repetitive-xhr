import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

// Solution #2 without an obvious downside

// first argument is dispatch function we can change any data we want
// second  argument is getState function we access or read any data we want. If we do not use getState, we can omit it.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, 'userId'));

    userIds.forEach(id => dispatch(fetchUser(id)));
}

// redux-thunk hooks up in src/index.js
export const fetchPosts = () => {
    // first argument is dispatch function we can change any data we want
    // second  argument is getState function we access or read any data we want. If we do not use getState, we can omit it.
    return async dispatch => {

        const response = await jsonPlaceholder.get('/posts')

        dispatch( {
            type: 'FETCH_POSTS',
            payload: response.data
        });
    }
}

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};



// with this function we are going to get repetitive XMR requests
// in order to avoid it we use _.memoize function
/*
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}
 */

// Solution #1 with lodash _.memoize function of above repetitive XMR requests
// but downside of this solution we can call this Action Creator only one time
// with each unique user ID and that effectively means that we can only fetch
// the user one time inside of application, but you can fetch different resources
// over time instead of it have to use one more Action Creator.
/*
export const fetchUser = id => dispatch => {
    _fetchUser(id, dispatch)
}
const _fetchUser = _.memoize(
    async (id, dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
    }
);
 */



// BAD approach
// ISSUE #1: an action must return a plain JS object
// in this case we return payload: response which is an async/await syntax
// in our case it is:
// export const fetchPosts = async () => {case 0: return jsonPlaceholder.get('/posts'); case 1: return {type: 'FETCH_POSTS', payload: response}
// return jsonPlaceholder.get('/posts') is not plain object
// ISSUE #2: By the time our action gets to a reducer,
// we won't have fetched our data because asynchronous action
// we must use custom middleware, for instance: redux-thunk.
/*
export const fetchPosts = async () => {
    const response = await jsonPlaceholder.get('/posts')
    return {
        type: 'FETCH_POSTS',
        payload: response
    }
}
 */






