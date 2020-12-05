import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';

const SpecialEvents = (props) => {
  const specialEvents = props.specialEvents.filter(
    (special) => special.Type === 'Special Event'
  );

  return (
    <div
      className="NewsItem"
      style={{ borderColor: 'blue', backgroundColor: '#ECF4FF' }}
    >
      <h2>Special Events</h2>
      <div>
        {specialEvents &&
          specialEvents.map((special) => (
              <div key={special.id} className="NewsItem">
                <h3>{special.Name}</h3>
                <p>
                  {moment(special.Start).format('LL')} from{' '}
                  {moment(special.Start).format('LT')} to
                  {moment(special.End).format('LT')}
                </p>
                <p>Where: {special.Location}</p>
                <p>{special.Description}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    specialEvents: state.calendarEvents,
  };
};

export default connect(mapState)(SpecialEvents);
