import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utility'

const inittialState = {
    prayerStarted: false,
    prayerCompleted: false,
    time: {
        percent: 100
    }
}

const prayerStarted = (state) => {
    return updateObject(state, {prayerStarted: true})
}

const prayerCompleted = (state) => {
    return updateObject(state, {prayerCompleted: true})
}

const prayerNotStarted = (state) => {
    return updateObject(state, {prayerStarted: false})
}

const fetchTime = (state, action) => {
    return updateObject(state, {
        time: action.time
    })
}

const reducer = (state=inittialState, action) => {
    switch(action.type) {
        case(actionTypes.PRAYER_STARTED): return prayerStarted(state)
        case(actionTypes.PRAYER_COMPLETED): return prayerCompleted(state)
        case(actionTypes.PRAYER_NOT_STARTED): return prayerNotStarted(state)
        case(actionTypes.FETCH_TIME): return fetchTime(state, action)
        default: return state
    }
}

export default reducer