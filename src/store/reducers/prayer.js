import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility'

const intitialState = {
    prayer: {
        verse: null,
        main: null
    },
    error: null
}
const fetchPrayerSuccess = (state, action) => {
    return updateObject(state, {prayer: action.prayer})
}

const fetchPrayerFail = (state, action) => {
    return updateObject(state, {error: action.error})
}


const reducer = (state = intitialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PRAYER_SUCCESS: return fetchPrayerSuccess(state, action)
        case actionTypes.FETCH_PRAYER_FAIL: return fetchPrayerFail(state, action)
        default: return state
    }
}

export default reducer;