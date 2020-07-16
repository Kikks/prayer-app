import React from 'react'

import sprite from '../assets/img/sprite.svg'

const Svg = (props) => (
    <svg onClick={props.clicked} className={props.class}><use xlinkHref={sprite+"#icon-"+props.src}></use></svg>
)

    
export default Svg