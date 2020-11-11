import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllEvents } from '../../redux/calendar'
import moment from 'moment'


class Agenda extends React.Component {
    componentDidMount(){
        this.props.getEvents()
    }

    render() {
        return (<div>
        <table className="EventCalendar">
            <thead>
                <tr className='Announcement'><td colSpan="5">Event Calendar</td></tr>
                <tr><td>Date</td><td>Name</td><td>Time</td><td>Location</td><td>Description</td></tr>
                    </thead>
            <tbody>{this.props.monthsEvents.map( monthEvent => {
            return (<tr key={monthEvent.id} className={monthEvent.Type}>
                <td>{moment(monthEvent.Start).format('LL')}</td>
                <td>{monthEvent.Name}</td>
                <td>{moment(monthEvent.Start).format('LT')} - {moment(monthEvent.End).format('LT')}</td>
                <td>{monthEvent.Location}</td>
                <td>{monthEvent.Description}</td>
            </tr>
            )})}</tbody>
            
        </table>
    </div>)
    }
    
}

const mapState = state => {
    return {
        monthsEvents: state.calendarEvents
    }
}

const mapDispatch = dispatch => {
    return {
        getEvents: () => dispatch(fetchAllEvents())
    }
}

export default connect(mapState, mapDispatch)(Agenda)

