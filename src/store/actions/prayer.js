import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const fetchPrayerSucces = (prayer) => {
    return {
        type: actionTypes.FETCH_PRAYER_SUCCESS,
        prayer: prayer
    }
}

export const fetchPrayerFail = (error) => {
    return {
        type: actionTypes.FETCH_PRAYER_FAIL,
        error: error
    }
}

export const fetchPrayer = () => {
    return dispatch => {
        axios.get('/prayer.json')
        .then(response => {
            dispatch(fetchPrayerSucces(response.data))
            
        })
        .catch(error => {
            dispatch(fetchPrayerFail(error))
        })
    }
}