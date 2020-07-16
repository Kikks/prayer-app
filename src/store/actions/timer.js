import * as actionTypes from './actionTypes'

export const prayerStarted = () => {
    return {
        type: actionTypes.PRAYER_STARTED
    }
}

export const prayerNotStarted = () => {
    return {
        type: actionTypes.PRAYER_NOT_STARTED
    }
}

export const prayerCompleted = () => {
    return {
        type: actionTypes.PRAYER_COMPLETED
    }
}

export const fetchTime = (time) => {
    return {
        type: actionTypes.FETCH_TIME,
        time: time
    }
}

export const isPrayerOngoing = () => {
    return dispatch => {        
        if(localStorage.getItem('countdownTime')) {
            dispatch(prayerStarted())
            const countDownTime = localStorage.getItem('countdownTime')
            const x = setInterval(() => {
                const currentTime = new Date().getTime()
    
                const distance = countDownTime - currentTime
                const percentage = (100 - ( (distance / 3600000000 *1000) * 100)).toFixed(2)
    
    
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / (1000))
            
                if(distance < 0) {
                    clearInterval(x)
                    dispatch(prayerCompleted())
                }
                const time = {
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                    percent: percentage
                }
                dispatch(fetchTime(time))
            }, 1000)
        } else {
            dispatch(prayerNotStarted())
        }
    }
}

export const timer = () => {
    return dispatch => {
        const countDownTime = new Date().getTime() + new Date(3600 * 1000).getTime()
        localStorage.setItem('countdownTime', countDownTime)
        const x = setInterval(() => {
            const currentTime = new Date().getTime()

            const distance = countDownTime - currentTime
            const percentage = (100 - ( (distance / 3600000000 *1000) * 100)).toFixed(2)


            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / (1000))
        
            if(distance < 0) {
                clearInterval(x)
                dispatch(prayerCompleted())
            }
            const time = {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                percent: percentage
            }
            dispatch(fetchTime(time))
        }, 1000)
    }
}