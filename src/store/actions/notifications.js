import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const fetchNotificationSucces = (notifications) => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        notifications: notifications
    }
}

export const fetchNotificationsFail = (error) => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
        error: error
    }
}

export const fetchNotifications = () => {
    return dispatch => {
        axios.get('/notifications.json')
        .then(response => {
            dispatch(fetchNotificationSucces(response.data))
            
        })
        .catch(error => {
            dispatch(fetchNotificationsFail(error))
        })
    }
}