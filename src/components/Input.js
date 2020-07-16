import React from 'react'

const Input = (props) => {
    switch(props.type){
        case "text":  return (
            <div className="input__group">
                <input onChange={props.changed} value={props.value} type="text" name={props.label} required={props.required} placeholder={props.label} className="input__text" />
                <label htmlFor={props.label} className="input__label">{props.label}</label>
            </div>
        )

        case "email":  return (
            <div className="input__group">
                <input onChange={props.changed} value={props.value} type="email" name={props.label} required={props.required} placeholder={props.label} className="input__text" />
                <label htmlFor={props.label} className="input__label">{props.label}</label>
            </div>
        )

        case "password":  return (
            <div className="input__group">
                <input onChange={props.changed} value={props.value} type="password" name={props.label} required={props.required} placeholder={props.label} className="input__text" />
                <label htmlFor={props.label} className="input__label">{props.label}</label>
            </div>
        )

        case "select": return (
            <div className="input__group">
                <select
                    className="input__select"
                    value={props.value}
                    name={props.label}
                    required={props.required}
                    onChange={props.changed}>
                    {props.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                <label htmlFor={props.label} className="input__label">{props.label}</label>
            </div>
        )

        default: return null
    }
}

export default Input