import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    signedIn: false
}

const authStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true,
        signedIn: false
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        signedIn: true
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        signedIn: false
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
        signedIn: false
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state); 

        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

        case actionTypes.AUTH_FAIL: return authFail(state, action);

        case actionTypes.AUTH_LOGOUT: return authLogout(state); 

        default: return state;
    };
};

export default reducer