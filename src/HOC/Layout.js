import React from 'react'
import Auxiliary from './Auxiliary'
import Navigation from '../components/Navigation'

const Layout = (props) => {
    return (
        <Auxiliary>
            <Navigation back = {props.back}/>
            {props.children}
        </Auxiliary>
    )
}

export default Layout