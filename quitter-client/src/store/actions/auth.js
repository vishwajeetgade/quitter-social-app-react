import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionType';
import {addError, removeError} from '../actions/errors';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logoutUser(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    return dispatch => {
        // wrap our promise in thunk so we can wait for api call
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                // data = { token , id, username, profileImgUrl}
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token)
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve(); // indicate that api call succeeded
                }).catch(err => {
                    dispatch(addError(err.message));
                    reject() // indicate that api call fail
                })
        });
    };
}