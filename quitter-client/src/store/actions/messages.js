import { apiCall } from '../../services/api';
import { addError } from '../actions/errors';
import { LOAD_MESSAGES, REMOVE_MESSAGES } from '../actionType';


export const loadMessage = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

export const removeMessage = (message_id) => ({
    type: REMOVE_MESSAGES,
    message_id
})

export function fetchMessages() {
    return dispatch => {
        return apiCall("get", "/api/messages")
            .then(res => {
                dispatch(loadMessage(res));
            })
            .catch(err => addError(err.message))
    };
};

export function postNewMessage(text) {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const id = currentUser.user.id;
        return apiCall('post', `/api/user/${id}/message`, {text})
            .then(res => ({}))
            .catch(err => dispatch(addError(err.message)))
    }
};


export function deleteMessage(message_id) {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/api/user/${user_id}/message/${message_id}`)
            .then(res => {
                dispatch(removeMessage(message_id));
            })
            .catch(err => addError(err));
    }
}


