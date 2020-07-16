import React, { Component } from 'react'
import Timer from './containers/Timer'
import Home from './containers/Home'
import Auth from './containers/Auth'
import { Switch, Route, Redirect } from 'react-router'
import Notifications from './containers/Notifications'
import Profile from './containers/Profile'
import { connect } from 'react-redux'

import * as actions from './store/actions'
import Logout from './containers/Logout'

class App extends Component{
  componentDidMount() {
    this.props.isPrayerOngoing()
    this.props.authCheckState()
    this.props.fetchUserProfileOnReload()
  }
  render() {
    let routes = (
      <Switch>
        <Route path = '/auth' component = {Auth} />
        <Redirect to = '/auth' />
      </Switch>
    )

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/timer' component={Timer} />
          <Route path='/notifications' component={Notifications} />
          <Route path="/profile" component={Profile} />
          <Route path='/' exact component={Home} />
        </Switch>
      )
      
    }
    return (
          <div id="App" className="App">
            {routes}
          </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isPrayerOngoing: () => dispatch(actions.isPrayerOngoing()),
    authCheckState: () => dispatch(actions.authCheckState()),
    fetchUserProfileOnReload: () => dispatch(actions.fetchUserProfileOnReload())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
