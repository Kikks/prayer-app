import React, { Component } from 'react'
import Auxiliary from '../HOC/Auxiliary'
import Input from '../components/Input'
import Button from '../components/Button'
import Logo from '../components/Logo'

import * as actions from '../store/actions'

import { updateObject, checkValidity } from '../utility'
import { connect } from 'react-redux'
import axios from '../axios-orders'
import { Redirect } from 'react-router'

class Auth extends Component {
    state = {
        sign: "in",
        signInForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            }
        },
        signUpForm1: {
            firstname: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            lastname: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            Team: {
                elementConfig: {
                    type: 'select',
                    options: [
                        {value: 'worship', displayValue: 'Tribe Worship'},
                        {value: 'sanctuary', displayValue: 'Tribe Sanctuary'},
                        {value: 'hospitality', displayValue: 'Hospitality Team'},
                        {value: 'tech', displayValue: 'Tribe Tech'},
                        {value: 'teamless', displayValue: 'No Team'}
                    ]
                },
                value: 'teamless',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        signUpForm2: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            password1: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re-enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            }
        },
        passwordMatch: true,
        secondForm: false,
        signInFormIsValid: false,
        signInError: false,
        signUpError: false,
        signUpForm1IsValid: false,
        signUpForm2IsValid: false,
        submitted: false
    }

    onChangedHandler1 = (event, formElement) => {
        this.signInFormValidity()
        const updatedControls = updateObject(this.state.signInForm, {
            [formElement]: updateObject(this.state.signInForm[formElement], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.signInForm[formElement])
            })
        })

        this.setState({signInForm: updatedControls})
    }

    onChangedHandler2 = (event, formElement) => {
        this.signUpForm1Validity()
        const updatedControls = updateObject(this.state.signUpForm1, {
            [formElement]: updateObject(this.state.signUpForm1[formElement], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.signUpForm1[formElement])
            })
        })

        this.setState({signUpForm1: updatedControls})
    }
    onChangedHandler3 = (event, formElement) => {
        setTimeout(() => {
            this.passwordMatchIdentifier()
        }, 1000);
        const updatedControls = updateObject(this.state.signUpForm2, {
            [formElement]: updateObject(this.state.signUpForm2[formElement], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.signUpForm2[formElement])
            })
        })

        this.setState({signUpForm2: updatedControls})
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        if(this.state.sign === "in") {
            setTimeout(() => {
                this.signInError()
            }, 300);
            this.props.onAuth(this.state.signInForm.email.value, this.state.signInForm.password.value, this.state.sign)
            this.props.onGetEmail(this.state.signInForm.email.value)
        }else {
            setInterval(() => {
                this.signUpError()
            }, 300);
            if(this.state.passwordMatch) {
                this.props.onAuth(this.state.signUpForm2.email.value, this.state.signUpForm2.password1.value, this.state.sign)
                const userData = {
                    firstname: this.state.signUpForm1.firstname.value,
                    lastname: this.state.signUpForm1.lastname.value,
                    team: this.state.signUpForm1.Team.value,
                    email: this.state.signUpForm2.email.value,
                }
                axios.post('users.json', userData)
                .then(
                    this.setState({submitted: true})
                )
                this.props.onGetEmail(this.state.signUpForm2.email.value)
            }
        }
    }

    switchAuthMode = () => {
        if(this.state.sign === "in") {
            this.setState({sign: "up", secondForm: false})
        }else if(this.state.sign === "up") {
            this.setState({sign: "in"})
        }
        this.setState(prevState => {
            // return {
            //     signInError: !prevState.signInError,
            //     signUpError: !prevState.signUpError
            // }
        })
    }

    passwordMatchIdentifier = () => {
        if(this.state.signUpForm2.password1.value === this.state.signUpForm2.password2.value && this.state.signUpForm2.password2.value !== ''){
            this.setState({passwordMatch: true})
        }else {
            this.setState({passwordMatch: false})
        }        
    }

    signInFormValidity = () => {
        if(this.state.signInForm.email.value !== '' && this.state.signInForm.password.value !== '') {
            this.setState({signInFormIsValid: true})
        }
    }

    signUpForm1Validity = () => {
        if(this.state.signUpForm1.firstname.value !== '' && this.state.signUpForm1.lastname.value !== '' && this.state.signUpForm1.Team.value !== '') {
            this.setState({signUpForm1IsValid: true})
        }
    }

    signInError = () => {
        if(this.props.error) {
            this.setState({signInError: true})
        }
    }

    signUpError = () => {
        if(this.props.error) {
            this.setState({signUpError: true})
        }
    }

    switchForm = () => {
        this.setState(prevState => {
            return {
                secondForm: !prevState.secondForm
            }
        })
    }

    render () {
        let form = null
        let status = null        

        const signInFormElementsArray = []
        for(let key in this.state.signInForm) {
            signInFormElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
            })
        }

        const signUp1FormElementsArray = []
        for(let key in this.state.signUpForm1) {
            signUp1FormElementsArray.push({
                id: key,
                config: this.state.signUpForm1[key]
            })
        }

        const signUp2FormElementsArray = []
        for(let key in this.state.signUpForm2) {
            signUp2FormElementsArray.push({
                id: key,
                config: this.state.signUpForm2[key]
            })
        }

        let classes = ["form__container"]
        if(this.state.secondForm) {
            classes = ["form__container", "form__container--next"]
        }


        if(this.state.sign === "in") {
            form = (
                <form onSubmit={this.onSubmitHandler} className="form">
                    {this.state.signInError ? <span className="form__error">Unregistered Email or Invalid Password.</span> : ""}
                    <div className="form__box">
                        {signInFormElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                type={formElement.config.elementConfig.type}
                                label={formElement.config.elementConfig.placeholder}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                required={formElement.config.validation.required}
                                shouldValidate = {formElement.config.validation}
                                changed={(event) => this.onChangedHandler1(event, formElement.id)}
                            />
                        ))}
                    </div>
                    <Button disabled ={!this.state.signInFormIsValid} clicked={this.onSubmitHandler}>Login</Button>
                </form>
            )

            status = <p className="paragraph status">Don't have an account? <span onClick={this.switchAuthMode} className="colored">Sign up</span></p>
        }
        else if(this.state.sign === "up") {
            form = (
                <form onSubmit={this.onSubmitHandler} className="form">
                    {this.state.signUpError ? <span className="form__error">Password too short or Email already taken.</span> : ""}
                    {!this.state.passwordMatch ? <span className="form__error">Passwords don't match or are empty.</span> : ""}
                    <div className={classes.join(" ")}>
                        <div className="form__1">
                            <div className="form__box">
                                {signUp1FormElementsArray.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        options={formElement.config.elementConfig.options}
                                        type={formElement.config.elementConfig.type}
                                        label={formElement.config.elementConfig.placeholder}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        required={formElement.config.validation.required}
                                        shouldValidate = {formElement.config.validation}
                                        changed={(event) => this.onChangedHandler2(event, formElement.id)}
                                    />
                                ))}
                            </div>
                            <Button disabled={!this.state.signUpForm1IsValid} clicked={this.switchForm}>Next</Button>
                        </div>
                        <div className="form__2">
                            <div className="form__box">
                                {signUp2FormElementsArray.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        type={formElement.config.elementConfig.type}
                                        label={formElement.config.elementConfig.placeholder}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        required={formElement.config.validation.required}
                                        shouldValidate = {formElement.config.validation}
                                        changed={(event) => this.onChangedHandler3(event, formElement.id)}
                                    />
                                ))}
                            </div>
                            <div className="form__2-button-container">
                                <Button clicked={this.switchForm}>Back</Button>
                                <Button disabled ={!this.state.passwordMatch} clicked={this.onSubmitHandler}>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </form>
            )
            if(this.state.submitted) {
                form = (
                    <form onSubmit={this.onSubmitHandler} className="form">
                        <div className="form__box">
                            <p className="form__paragraph">You have signed up successfully! You can now log in.</p>
                        </div>
                    </form>
                )
            }
            status = <p className="paragraph status">Alredy have an account? <span onClick={this.switchAuthMode} className="colored">Log in</span></p>
        }        

        let AuthComponent = (
            <Auxiliary>
                <Logo />
                <main className="main">
                    <div className="container">
                        <div className="form__heading-box">
                            <h2 className="heading--2">Welcome Family</h2>
                            <p className="paragraph">Login or Sign up to continue.</p>
                        </div>
                        {form}
                    </div>
                    
                    {status}
                    {}
                </main>
            </Auxiliary>
        )
        if(this.props.isAuth){
            AuthComponent = <Redirect to="/" />
        }
        return (
            [AuthComponent]
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
    }
}

const mapDispathcToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onGetEmail: (email) => dispatch(actions.getEmail(email))
    }
}

export default connect(mapStateToProps, mapDispathcToProps)(Auth)
