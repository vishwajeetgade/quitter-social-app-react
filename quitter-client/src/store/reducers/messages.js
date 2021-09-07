import { LOAD_MESSAGES, REMOVE_MESSAGES } from "../actionType";

export default (state = [], action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGES:
            return state.filter(message => message._id !== action.message_id);
        default:
            return state;
    }
}