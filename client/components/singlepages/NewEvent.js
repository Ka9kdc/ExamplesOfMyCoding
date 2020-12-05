import React from 'react';
import { connect } from 'react-redux';
import { submitNewEvent } from '../../redux/calendar';

class NewEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      Date: '',
      StartTime: '',
      EndTime: '',
      Location: '',
      Description: '',
      Type: 'Select Event Type',
      valid: {
        Name: true,
        Date: true,
        Start: true,
        End: true,
        Location: true,
        Type: true,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'StartTime') {
      const startArr = event.target.value.split(':');
      let endMinute = parseInt(startArr[1], 10) + 15;

      if (endMinute >= 60) {
        let endHour = parseInt(startArr[0], 10);
        endMinute -= 60;
        endHour++;
        if (endMinute < 10) {
          endMinute = `0${endMinute}`;
        }
        if (endHour === 24) {
          endHour = '00';
        } else if (endHour < 10) {
          endHour = `0${endHour}`;
        }
        this.setState({
          StartTime: event.target.value,
          EndTime: `${endHour}:${endMinute}`,
        });
      } else {
        const endArr = [startArr[0], endMinute];
        this.setState({
          StartTime: event.target.value,
          EndTime: endArr.join(':'),
        });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  validate() {
    const valid = {
      Name: true,
      Date: true,
      Start: true,
      End: true,
      Location: true,
      Type: true,
    };
    if (this.state.Name === '') {
      valid.Name = false;
    }
    if (this.state.Location === '') {
      valid.Location = false;
    }
    if (this.state.Date === '') {
      valid.Date = false;
    }
    if (this.state.StartTime === '') {
      valid.Start = false;
    }
    if (this.state.Type === 'Select Event Type') {
      valid.Type = false;
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();
    const valid = this.validate();
    const Start = new Date(`${this.state.Date} ${this.state.StartTime}`);
    const End = new Date(`${this.state.Date} ${this.state.EndTime}`);
    if (Start - End > 0) {
      valid.End = false;
    }
    this.setState({ valid: valid });
    let submit = true;
    for (let el in valid) {
      if (!valid[el]) {
        submit = false;
        break;
      }
    }
    if (submit) {
      const newEvent = {
        Start,
        End,
        Name: this.state.Name,
        Location: this.state.Location,
        Description: this.state.Description,
        Type: this.state.Type,
      };
      this.props.submitEvent(newEvent);
    }
  }

  render() {
    const eventTypes = [
      'Select Event Type',
      'Net',
      'Club Meeting',
      'Special Event',
      'Public Service Event',
      'Training Class',
      'Testing',
      'CSU',
    ];
    return (
      <>
        <div>
          <label htmlFor="Name">Event Name</label>
          <input
            type="text"
            value={this.state.Name}
            onChange={this.handleChange}
            name="Name"
          />
          {!this.state.valid.Name && <span>Enter the name of the Event</span>}
        </div>
        <div>
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            value={this.state.Date}
            onChange={this.handleChange}
            name="Date"
          />
          {!this.state.valid.Date && <span>Enter the Event will occur</span>}
        </div>
        <div>
          <label htmlFor="StartTime">Start Time</label>
          <input
            type="time"
            value={this.state.StartTime}
            onChange={this.handleChange}
            name="StartTime"
          />
          {!this.state.valid.Start && (
            <span>Enter the time the Event Starts</span>
          )}
        </div>
        <div>
          <label htmlFor="EndTime">EndTime</label>
          <input
            type="time"
            value={this.state.EndTime}
            onChange={this.handleChange}
            name="EndTime"
          />
          {!this.state.valid.End && (
            <span>End time must be after start time</span>
          )}
        </div>
        <div>
          <label htmlFor="Location">Location</label>
          <input
            type="text"
            value={this.state.Location}
            onChange={this.handleChange}
            name="Location"
          />
          {!this.state.valid.Location && (
            <span>Enter where the event will occur</span>
          )}
        </div>
        <div>
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            value={this.state.Description}
            onChange={this.handleChange}
            name="Description"
          />
        </div>
        <div>
          <label htmlFor="Type">Type</label>
          <select
            value={this.state.Type}
            onChange={this.handleChange}
            name="Type"
          >
            {eventTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          {!this.state.valid.Type && (
            <span>Select the type of event this is.</span>
          )}
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Submit Events
        </button>
      </>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitEvent: (newEvent) => dispatch(submitNewEvent(newEvent)),
  };
};

export default connect(null, mapDispatch)(NewEvent);
