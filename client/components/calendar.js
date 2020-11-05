import React from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from 'react-redux';
import {fetchAllEvents} from '../redux/calendar'


const localizer = momentLocalizer(moment)

class MyCalender extends React.Component{
    componentDidMount(){
        this.props.getEvents()
    }
   render() {
       console.log(this.props.myEventsList)
        if(this.props.myEventsList){
            return (
                <div style={{height: '100vh'}}>
                    <Calendar
                        localizer={localizer}
                        events={this.props.myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        />
                </div>
            )
        } else {
            return <h1>Loading</h1>
        }
    }
}

const mapState = state => {
    return {
        myEventsList: state.calendarEvents
    }
}

const mapDispatch = dispatch => {
    return {
        getEvents: () => dispatch(fetchAllEvents())
    }
}

export default connect(mapState, mapDispatch)(MyCalender)