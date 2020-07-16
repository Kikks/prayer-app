import React from 'react'

const Notification = (props) => (
    <div className="component">
        <span className="component__title notification__title">{props.title}</span>
        <p>{props.body}</p>
    </div>
)

export default Notification