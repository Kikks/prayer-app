import React from 'react'
import { NavLink } from 'react-router-dom'

const Checkin = (props) => {
    let status = 'You have not prayed today. Clock in & pray now!'

    if(props.prayed) {
        status = 'You have clocked in prayer for today. Weldone!'
    }
    return (
        <div className="component">
            <div className="component__title">
                Today's Prayer
            </div>
            <p>{status}</p>
            <NavLink to = "/timer" className="button">Clock In</NavLink>
        </div>
    )
}

export default Checkin