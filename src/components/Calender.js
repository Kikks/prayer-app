import React from 'react'
import Svg from './Svg'

const Calender = () => {
    return (
        <div className="component">
            <div className="component__title">
                Prayer Status This Week
            </div>
            <div className="calender">
                <div className="calender__comp">
                    <span className="calender__day">Sunday</span>
                    <Svg src="check" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Monday</span>
                    <Svg src="cross" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Tuesday</span>
                    <Svg src="check" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Wednesday</span>
                    <Svg src="check" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Thursday</span>
                    <Svg src="cross" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Friday</span>
                    <Svg src="check" class="calender__check" />
                </div>
                <div className="calender__comp">
                    <span className="calender__day">Saturday</span>
                    <Svg src="check" class="calender__check" />
                </div>
            </div>
        </div>
    )
}

export default Calender