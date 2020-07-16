import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const fetchUserProfileSuccess = (profile) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
        profile: profile
    }
}

export const fetchUserProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_FAIL,
        error: error
    }
}

export const getEmailSuccess = (email) => {
    return {
        type: actionTypes.GET_EMAIL_SUCCESS,
        email: email
    }
}

export const getEmail = (email) => {
    return dispatch => {
        const emailData = email
        dispatch(getEmailSuccess(emailData))
    }
}

export const fetchUserProfileOnReload = () => {
    return dispatch => {
        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')
        const queryParams = '?auth=' + token + '&orderBy="email"&equalTo="' + email + '"'
        localStorage.setItem('email', email)
        axios.get('/users.json' + queryParams)
        .then(response => {
            const fetchedUser = [];
            for(let key in response.data){
                fetchedUser.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchUserProfileSuccess(fetchedUser))
        }).catch(error => {
            dispatch(fetchUserProfileFail(error))
        })
    }
}

export const fetchUserProfile = (token, email) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="email"&equalTo="' + email + '"'
        localStorage.setItem('email', email)
        axios.get('/users.json' + queryParams)
        .then(response => {
            const fetchedUser = [];
            for(let key in response.data){
                fetchedUser.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchUserProfileSuccess(fetchedUser))
        })
        .catch(error => {
            dispatch(fetchUserProfileFail(error))
        })
    }
}