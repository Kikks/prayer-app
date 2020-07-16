import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility'

const intitialState = {
    notifications: null,
    error: null
}
const fetchNotificationsSuccess = (state, action) => {
    return updateObject(state, {notifications: action.notifications})
}

const fetchNotificationsFail = (state, action) => {
    return updateObject(state, {error: action.error})
}


const reducer = (state = intitialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_NOTIFICATIONS_SUCCESS: return fetchNotificationsSuccess(state, action)
        case actionTypes.FETCH_NOTIFICATIONS_FAIL: return fetchNotificationsFail(state, action)
        default: return state
    }
}

export default reducer;