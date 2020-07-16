import React from 'react'

const Button = (props) => {
    return (
        <button onClick = {props.clicked} disabled={props.disabled} className="button">{props.children}</button>
    )
}

export default Button