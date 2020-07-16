import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Prayer extends Component {
    componentDidMount() {
        this.props.onFetchPrayer()
    }

    render() {
        let message = 'Getting Prayer...'

        if(this.props.error) {
            message = "Could not get Prayer"
            alert('Check your internet connection.')
        }
        return (
            <div className="component">
                <div className="prayer__titles">
                    <span className="component__title">Pauline Prayer</span>
                    <span className="prayer__verse">{this.props.prayer.verse ? this.props.prayer.verse : ''}</span>
                </div>
                <div className="prayer__main-container">
                    <p className="prayer__main">{this.props.prayer.main ? this.props.prayer.main : message}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        prayer: state.prayer.prayer,
        error: state.prayer.error
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onFetchPrayer: () => dispatch(actions.fetchPrayer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prayer)