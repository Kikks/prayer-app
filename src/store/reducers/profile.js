import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility'

const initialState = {
    email: null,
    profile: null,
    error: null
}

const getEmailSuccess = (state, action) => {
    return updateObject(state, {email: action.email})
}

const fetchUserProfileSuccess = (state, action) => {
    return updateObject(state, {profile: action.profile})
}

const fetchUserProfileFail = (state, action) => {
    return updateObject(state, {error: action.error})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.GET_EMAIL_SUCCESS): return getEmailSuccess(state, action)

        case(actionTypes.FETCH_USER_PROFILE_SUCCESS): return fetchUserProfileSuccess(state, action)

        case(actionTypes.FETCH_USER_PROFILE_FAIL): return fetchUserProfileFail(state, action)
        default: return state
    }
}

export default reducer