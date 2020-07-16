import React, { Component } from 'react'

class Header extends Component {
    state = {
        date: {
            year: '',
            month: '',
            day: '',
            date: '',
            hour: '',
            minute: ''
        }
    }

    componentDidMount() {
        this.getDate()
    }

    getDate = () => {
        // eslint-disable-next-line no-unused-vars
        const time = setInterval(() => {
            const year = new Date().getFullYear()
            const monthNo = new Date().getMonth()
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
            let month = null

            for(let i = 0; i <= 11; i++) {
                if(i === monthNo) {
                    month = months[i]
                }
            }

            const dayNo = new Date().getDay()
            const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            let day = null

            for(let i = 0; i <= 6; i++) {
                if(i === dayNo) {
                    day = days[i]
                }
            }

            const date = new Date().getDate()
            const hour = new Date().getHours()
            const minute = new Date().getMinutes()

            const pad = (no) => {
                return (no < 10 ? "0" + no.toString() : no.toString())
            }

            this.setState({
                date: {
                    year: year,
                    month: month,
                    day: day,
                    date: date,
                    hour: pad(hour),
                    minute: pad(minute)
                }
            })
        }, 1000);
    }

    render() {
        let greeting = null
        const date = this.state.date

        if(date.hour < 12) {
            greeting = "Good morning!"
        } else if(date.hour < 16) {
            greeting = "Good Afternoon!"
        } else if(date.hour < 24) {
            greeting = "Good Evening!"
        }


        return (
            <div className="header">
                <div className="header__date">
                    {date.day +", " + date.month + date.date + ", " + date.year}
                </div>
                <div className="header__time">
                    {date.hour + ":" + date.minute}
                </div>
                <div className="header__greeting">
                    {greeting}
                </div>
            </div>
        )
    }
}

export default Header