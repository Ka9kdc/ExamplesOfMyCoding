import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const PublicServiceEvents = (props) => {
  const publicService = props.serviceEvents.filter(
    (service) => service.Type === 'Public Service Event'
  );

  return (
    <div
      className="NewsItem"
      style={{ borderColor: 'blue', backgroundColor: '#ECF4FF' }}
    >
      <div>
        <h2>Public Service Events</h2>

        <p>
          Watch our Event Calendar for information on our next public service
          event.
        </p>

        <p>
          For more information contact our Public Service Chair{' '}
          <a href="mailto:hamradion0mo@gmail.com">Mike W, N0MO.</a>
        </p>
      </div>
      <div>
        {publicService &&
          publicService.map((service) => {
            return (
              <div className="NewsItem" key={service.id}>
                <h3>{service.Name}</h3>
                <p>
                  {moment(service.Start).format('LL')} from{' '}
                  {moment(service.Start).format('LT')} to{' '}
                  {moment(service.End).format('LT')}
                </p>
                <p>Where: {service.Location}</p>
                <p>{service.Description}</p>
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
