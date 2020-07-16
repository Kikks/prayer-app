import React, { Component } from 'react'
import Svg from '../components/Svg'
import Layout from '../HOC/Layout'
import Prayer from '../components/Prayer'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Timer extends Component {
    state = {
        hours: '',
        minutes: '',
        seconds: '',
        percent: 100,
        distance: null
    }

    componentDidMount(){
        window.scrollTo(0,0)
    }
    
    onStartTimer = () => {
        this.props.onStartPrayer()
        this.props.onStartTimer()
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render () {
        let time = null
        let root = document.documentElement
        let instruction = null      
        const timer = this.props.time

        root.style.setProperty('--svg-percent', timer.percent)

        if(this.props.prayerStarted) {
            if(!this.props.prayerCompleted) {
                time = (
                    <div className="timer__display">
                        <span>{timer.hours}</span>:<span>{timer.minutes}</span>:<span>{timer.seconds}</span>
                    </div>
                )
                instruction = "Make sure you are praying!"
            } else {
                time = (
                    <div className="timer__display">
                        <h2 className="heading--2">Completed!</h2>
                    </div>
                )
                instruction = "Bless God! Congratulations on a time well spent with the Father."
            }
        } else {
            time = (
                <div className="timer__display">
                    <Svg clicked={this.onStartTimer} class="timer__play" src="controller-play" />
                </div>
            )
            instruction = "Click on the play button to Clock in for prayer."
        }

        
        return (
            <Layout back={this.goBack}>
                <main className="main--1">
                <h2 className="heading--3">Prayer Tracker</h2>
                    <div className="timer__container">
                        <div className="timer">
                            <div className="timer__percent">
                                <svg>
                                    <circle cx="100" cy="100" r="100"></circle>
                                    <circle cx="100" cy="100" r="100"></circle>
                                </svg>
                                <div className="timer__time">
                                    {time}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="center">
                        {instruction}
                    </p>
                    <Prayer />
                </main>
            </Layout>
        ) 
    }
    
}

const mapStateToProps = state => {
    return {
        prayerStarted: state.timer.prayerStarted,
        prayerCompleted: state.timer.prayerCompleted,
        time: state.timer.time
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartPrayer: () => dispatch(actions.prayerStarted()),
        onStartTimer: () => dispatch(actions.timer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)