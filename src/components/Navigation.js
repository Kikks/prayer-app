import React, { Component } from 'react'
import Logo from './Logo'
import Svg from './Svg'
import { NavLink } from 'react-router-dom'
import Auxiliary from '../HOC/Auxiliary'

class Navigation extends Component {
    state = {
        menuShown: false
    }

    toggleDropdown = () => {
        this.setState(prevState => {
            return{
                menuShown: !prevState.menuShown
            }
        })
    }

    render() {
        let backdrop = []
        let menu = []
        let dropdown = []

        if(this.state.menuShown) {
            backdrop = ["backdrop", "backdrop--opened"]
            menu = ["menu__btn", "menu__btn--opened"]
            dropdown = ["menu__dropdown", "menu__dropdown--opened"]
        } else {
            backdrop = ["backdrop", "backdrop--closed"]
            menu = ["menu__btn", "menu__btn--closed"]
            dropdown = ["menu__dropdown", "menu__dropdown--closed"]
        }

        return (
            <Auxiliary>
                <div onClick={this.toggleDropdown} className={backdrop.join(" ")}></div>
                <nav className="nav">
                    <div className="nav__back">
                        <Svg clicked={this.props.back} src="chevron-left" class="nav__back-svg" />
                    </div>
                    <Logo />
                    <div className="menu">
                        <div onClick={this.toggleDropdown} className="menu__btn-container">
                            <span className={menu.join(" ")}></span>
                            <div className={dropdown.join(" ")}>
                                <NavLink to="/" className="menu__dropdown-link">
                                    <Svg src="home" class="nav__svg" />
                                    <span>Home</span>
                                </NavLink>
                                <NavLink to="/profile" className="menu__dropdown-link">
                                    <Svg src="user" class="nav__svg" />
                                    <span>Profile</span>
                                </NavLink>
                                <NavLink to="/notifications" className="menu__dropdown-link">
                                    <Svg src="bell" class="nav__svg" />
                                    <span>Notifications</span>
                                </NavLink>
                                <NavLink to="/logout" className="menu__dropdown-link">
                                    <Svg src="log-out" class="nav__svg" />
                                    <span>Logout</span>
                                </NavLink>
                            </div>
                        </div>
                        
                    </div>
                </nav>
            </Auxiliary>
        )
    }
}

export default Navigation