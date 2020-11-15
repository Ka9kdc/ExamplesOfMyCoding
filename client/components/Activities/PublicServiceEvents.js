import React from 'react';
import {connect} from 'react-redux'

const PublicServiceEvents = (props) => {
  const publicService = props.serviceEvents.filter(
    (service) => service.Type === 'Public Service Event'
  );
  console.log(publicService)
  return (
    <div
      className="NewsItem"
      style={{ borderColor: 'blue', backgroundColor: '#ECF4FF' }}
    >
      <h2>Public Service Events</h2>

      <p>
        Watch our Event Calendar for information on our next public service
        event.
      </p>

      <p>
        For more information contact our Public Service Chair{' '}
        <a href="mailto:hamradion0mo@gmail.com">Mike W, N0MO.</a>
      </p>

      <div>
        {publicService && 
          publicService.map((service) => {
            return (
              <div className="NewsItem">
                <h3>{service.Name}</h3>
                <p>
                  {' '}
                  {moment(special.Start).format('LL')} from{' '}
                  {moment(special.Start).format('LT')} to
                  {moment(special.End).format('LT')}
                </p>
                <p>Where: {special.Location}</p>
                <p>{special.Description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    serviceEvents: state.calendarEvents,
  };
};

export default connect(mapState)(PublicServiceEvents);
