import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { connect } from 'react-redux'
import { submitNewEvent } from '../../redux/calendar'

class NewEvent extends React.Component{
    constructor(){
        super()
        this.state = {
            Name: '',
            Date: '',
            StartTime: '',
            EndTime: '',
            Location: '',
            Description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
       
         if (event.target.name === 'StartTime'){
            const startArr = event.target.value.split(':')
            const endMinute = parseInt(startArr[1])+15
            const endArr = [startArr[0], endMinute]
            this.setState({StartTime: event.target.value, EndTime: endArr.join(':')})
        } else {
             this.setState({[event.target.name]: event.target.value})
        }
    }


    handleSubmit(event){
        event.preventDefault()
        const Start = new Date(`${this.state.Date} ${this.state.StartTime}:00`)
        const End = new Date(`${this.state.Date} ${this.state.EndTime}:00`)
       const newEvent = {
           Start,
           End,
           Name: this.state.Name,
           Location: this.state.Location,
           Description: this.state.Description
       }
this.props.submitEvent(newEvent)
    }

    render(){
        return (
            <div>
                <label htmlFor='Name'>Event Name</label>
                <input type='text' value={this.state.Name} onChange={this.handleChange} name='Name' />
                <label htmlFor='Date'>Date</label>
                <input type="date" value={this.state.Date} onChange={this.handleChange} name='Date' />
                <label htmlFor='StartTime'>Start Time</label>
                <input type="time" value={this.state.StartTime} onChange={this.handleChange} name='StartTime' />
                <label htmlFor='EndTime'>EndTime</label>
                <input type="time" value={this.state.EndTime} onChange={this.handleChange} name='EndTime' />
                <label htmlFor='Location'>Location</label>
                <input type="text" value={this.state.Location} onChange={this.handleChange} name='Location' />
                <label htmlFor='Description'>Description</label>
                <input type="text" value={this.state.Description} onChange={this.handleChange} name='Description' />
                <button type='submit' onClick={this.handleSubmit}>Submit Events</button></div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        submitEvent: (newEvent) => dispatch(submitNewEvent(newEvent))
    }
}

export default connect(null, mapDispatch)(NewEvent)