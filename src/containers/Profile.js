import React, { Component } from 'react'
import Layout from '../HOC/Layout'
import ProfileDetail from '../components/ProfileDetail'
import { connect } from 'react-redux'

import * as actions from '../store/actions' 

class Profile extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
        this.props.onFetchProfile(this.props.token, this.props.email)
    }
    
    goBack = () => {
        this.props.history.goBack()
    }

    render() {        
        let message = "Loading..."

        if(this.props.error) {
            message = "Could not load profile detail"
        }
        return (
            <Layout back={this.goBack}>
                <main className="main--1">
                    <div className="profile__container">
                        <figure className="profile__picture-box">
                            <img src="https://via.placeholder.com/150" alt="DP" className="profile__picture" />
                        </figure>
                        <input type="file" name="profilePicture" id="profilePicture"/>
                        <label htmlFor="profilePicture" className="button">Change Profile Picture</label>
                    </div>
                    <div className="profile__details-container">
                        <ProfileDetail title="First Name" content={this.props.profile ? this.props.profile[0].firstname : message} />
                        <ProfileDetail title="Last Name" content={this.props.profile ? this.props.profile[0].lastname : message} />
                        <ProfileDetail title="Team" content={this.props.profile ? "Tribe " + this.props.profile[0].team : message} />
                    </div>
                </main>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        email: state.profile.email,
        token: state.auth.token,
        error: state.profile.error
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onFetchProfile: (token, email) => dispatch(actions.fetchUserProfile(token, email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
