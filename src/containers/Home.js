import React, { Component } from 'react'
import Prayer from '../components/Prayer'
import Calender from '../components/Calender'
import Checkin from '../components/Checkin'
import Header from '../components/Header'

import Layout from '../HOC/Layout'
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render () {
        return (
            <Layout back = {this.goBack}>
                <main className="main--1">
                    <h2 className="heading--3">Home</h2>
                    <Header />
                    <Calender />
                    <Prayer />
                    <Checkin prayed={this.props.prayerCompleted}/>
                </main>
            </Layout>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        prayerCompleted: state.timer.prayerCompleted
    }
}

export default connect(mapStateToProps)(Home)