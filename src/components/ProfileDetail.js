import React from 'react'

const ProfileDetail = (props) => (
    <div className="profile__details">
        <span className="profile__details-title">{props.title}</span>
        <span>{props.content}</span>
    </div>
)

export default ProfileDetail