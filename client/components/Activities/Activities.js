import React from 'react';
import Agenda from '../home/Agenda';
import FoxHunting from './FoxHunting';
import PublicServiceEvents from './PublicServiceEvents';
import SpecialEvents from './SpecialEvents';


const Activities = (props) => {
  return (
    <div>
      <div className="Title">WCRA Events</div>

      <div className="Content">
        <div style={{ float: 'right', width: '30%', marginRight: '0' }}>
          <Agenda />
        </div>
        <div>
          <h1>Regular Events</h1>

          <p>
            Regular WCRA events are listed here and in our meeting minutes which
            can be found on the <a href="Hamletter.html">hamletter page</a>.
          </p>

          <h2>Meetings</h2>

          <p>
            WCRA meets the first Friday of most months at the First Presbyterian
            Church in Wheaton at 7:30 PM. WCRA was founded in 1948 and continues
            to be involved in all facets of Amateur Radio, supporting the
            healthy growth of the hobby through diversification and
            participation.
          </p>

          <p>
            Our members have always been our most important asset and we would
            like to see you join us for our next meeting. Our business meetings
            are followed by a break for conversation, coffee, soda pop, and
            snacks. This is followed by an amateur radio related program. Come
            to a meeting and share the enthusiasm!
          </p>
        </div>
        <FoxHunting />
        <div>
          <h1>Special & Public Service Events</h1>

          <p>
            WCRA members participate in a number of activities throughout the
            year that are not regular, monthly events. Though these events will
            likely show up on the Hamletter's calendar, we use this space to
            publish information about special events in which our members are
            participating.
          </p>
          <p>
            We will use this page to highlight our Public Service Activity, so
            check the schedule regularly for updates on such activities.
          </p>
          <SpecialEvents />
          <PublicServiceEvents />
        </div>
      </div>
    </div>
  );
};

export default Activities;
