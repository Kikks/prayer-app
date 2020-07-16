import React, { Component } from 'react'
import Layout from '../HOC/Layout'
import Notification from '../components/Notification'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Notifications extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
        this.props.onFetchNotifications()
    }

    goBack = () => {
        this.props.history.goBack()
    }
    
    render() {
        const NotificationsArray = []

        if(this.props.notifications) {
           for(let key in this.props.notifications) {
                NotificationsArray.push({
                    id: key,
                    config: this.props.notifications[key]
                })
            }
        }
        
        let title = 'Loading...'
        let body = ''
         if(this.props.error) {
             title = 'Error'
             body = 'There was an error while fetching notifications'
             alert('Check your internet connection.')
         }

        return (            
            <Layout back={this.goBack}>
                <main className="main--1">
                    <h2 className="heading--3">Notifications</h2>
                    <div className="notification__container">
                        {this.props.notifications ?
                             NotificationsArray.map(notification => (
                                <Notification key = {notification.id} title={notification.config.title} body={notification.config.body} />
                            )):
                            <Notification title={title} body={body} />
                        }
                        </div>
                </main>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications.notifications,
        error: state.notifications.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotifications: () => dispatch(actions.fetchNotifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)