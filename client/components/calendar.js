import React from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
const myEventsList = []
const MyCalender = props => {
    return (
        <div style={{height: '100vh'}}>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                />
        </div>
    )
}

export default MyCalender