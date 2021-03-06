import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as actions from "../store/actions";

class Logout extends Component {
    componentDidMount () {
        this.props.logout();
    }

    render() {
        const redirect = <Redirect to = "/auth" />

        return redirect;
    };
};

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);