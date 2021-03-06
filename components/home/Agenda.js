import React from 'react';
import { connect } from 'react-redux';
import { fetchMonthsEvents } from '../../reduxStore/calendar';
import moment from 'moment';

class Agenda extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div className="NewsItem">
        <table className="EventCalendar">
          <thead>
            <tr className="Announcement">
              <td colSpan="5">
                <h4>Event Calendar</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.props.monthsEvents.map((monthEvent) => {
              return (
                <tr
                  key={monthEvent.id}
                  className={monthEvent.Type.split(' ').join('')}
                >
                  <td>{moment(monthEvent.Start).format('LL')}</td>
                  <td>{monthEvent.Name}</td>
                  {monthEvent.Type === 'Special Event' ? (
                    <td>
                      {moment(monthEvent.Start).format('LT')} -{' '}
                      {moment(monthEvent.End).format('LT')}
                    </td>
                  ) : (
                    <td>{moment(monthEvent.Start).format('LT')}</td>
                  )}
                  <td>{monthEvent.Location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    monthsEvents: state.calendarEvents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: () => dispatch(fetchMonthsEvents()),
  };
};

export default connect(mapState, mapDispatch)(Agenda);
