import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../redux/calendar';
import { me } from '../../redux/user';
import NewEvent from './NewEvent';

const localizer = momentLocalizer(moment);

class MyCalender extends React.Component {
  componentDidMount() {
    this.props.getEvents();
    this.props.getMe();
  }

  render() {
    if (this.props.myEventsList.length) {
      return (
        <div>
          <div className="Title">Calendar</div>

          <div className="Content">
            {this.props.user.id ? <NewEvent /> : ''}
            <Calendar
              localizer={localizer}
              events={this.props.myEventsList}
              style={{ height: '100vh' }}
              startAccessor="Start"
              titleAccessor={(event) =>
                `${moment(event.Start).format('LT')} ${event.Name}`
              }
              endAccessor="End"
              views={['month', 'agenda']}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Title">Calendar</div>

          <div className="Content">
            <h1>Loading</h1>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    myEventsList: state.calendarEvents,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: () => dispatch(fetchAllEvents()),
    getMe: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(MyCalender);
