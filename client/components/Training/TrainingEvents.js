import React from 'react';
import { connect } from 'react-redux';
import { fetchTrainingEvents } from '../../redux/calendar';
import moment from 'moment'

class TrainingEvents extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }
  render() {
      console.log(this.props.trainingEvents)
    const testing = this.props.trainingEvents.filter(
      (training) => training.Type === 'Testing'
    );
    const trainingClass = this.props.trainingEvents.filter(
      (training) => training.Type === 'Training Class'
    );
    console.log('testing', testing)
    console.log('training', trainingClass)
    return (
      <div>
        <div>
          <h1>Upcoming Technician Class Training and License Examination</h1>
          {trainingClass && trainingClass.length ? trainingClass.map( training => (
            <div className="NewsItem" key={training.id}>
              <h2>
                {training.Name} on{' '}
                {moment(training.Start).format('LL')}
              </h2>
              <p>
                Time: {moment(training.Start).format('LT')} to{' '}
                {moment(training.End).format('LT')}
              </p>
              <p>Location: {training.Location}</p>
              <p>{training.Description}</p>
            </div>)
          ) : (
            <div className="NewsItem">
              <p>
                There are no classes currently schedule. Please check back
                later.
              </p>
            </div>
          )}
        </div>
        <div>
          <h1>Additional Exam Sessions</h1>
          {testing && testing.length ? testing.map( testingEvent => (
            <div className="NewsItem" key={testingEvent.id}>
              <h2>
                {testingEvent.Name} on {moment(testingEvent.Start).format('LL')}
              </h2>
              <p>
                Time: {moment(testingEvent.Start).format('LT')} to{' '}
                {moment(testingEvent.End).format('LT')}
              </p>
              <p>Location: {testingEvent.Location}</p>
              <p>{testingEvent.Description}</p>
            </div>)
          ) : (
            <div className="NewsItem">
              <p>
                There are no additional WCRA Exam session scheduled at this
                time. Please check back later.
              </p>
            </div>
          )}

          <p>
            If you didn't pass the test at one of our classes or just wanted to
            wait until you were more prepared, exam sessions occurring
            periodically throughout the year by the WCRA VE TEAM. Contact{' '}
            <a href="mailto:ve-testing@w9ccu.org">Tim Wheeler, KC9YFI</a> for
            more info. You can find information on other local testing using the {' '}
            <a href="http://www.arrl.org/exam_sessions/">
              ARRL Amateur Radio License Exam search
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

const mapState = state => {
    return {
        trainingEvents: state.calendarEvents
    }
}

const mapDispatch = dispatch => {
    return {
        getEvents: () => dispatch(fetchTrainingEvents())
    }
}

export default connect(mapState, mapDispatch)(TrainingEvents)