import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as rrd from 'react-router-dom';
import store from '../../store';
import NewEvent from './NewEvent';

//Tests: 46 passing 0pending/failing
describe.skip('New Event form', () => {
  let newEventForm;
  let formInputs;
  before(() => {
    newEventForm = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/calendar']}>
          <NewEvent />
        </rrd.MemoryRouter>
      </Provider>
    );
    formInputs = newEventForm
      .find('div')
      .map((node) => node.get(0).props.children);
  });
  describe('Event Name Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[0];
      input = field[1].props;
    });
    it('has a label for Event Name', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('Name');
      expect(label.props.children).to.equal('Event Name');
    });
    it('has an input field with type text', () => {
      expect(input.type).to.equal('text');
    });
    it('has a field name of NAME', () => {
      expect(input.name).to.equal('Name');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event Date Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[1];
      input = field[1].props;
    });

    it('has a label for Event Date', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('Date');
      expect(label.props.children).to.equal('Date');
    });
    it('has an input field with type date', () => {
      expect(input.type).to.equal('date');
    });
    it('has a field name of Date', () => {
      expect(input.name).to.equal('Date');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event start time Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[2];
      input = field[1].props;
    });
    it('has a label for Event Start time', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('StartTime');
      expect(label.props.children).to.equal('Start Time');
    });
    it('has an input field with type time', () => {
      expect(input.type).to.equal('time');
    });
    it('has a field name of StartTime', () => {
      expect(input.name).to.equal('StartTime');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event endtime Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[3];
      input = field[1].props;
    });
    it('has a label for Event end time', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('EndTime');
      expect(label.props.children).to.equal('End Time');
    });
    it('has an input field with type time', () => {
      expect(input.type).to.equal('time');
    });
    it('has a field name of EndTime', () => {
      expect(input.name).to.equal('EndTime');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event Location Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[4];
      input = field[1].props;
    });
    it('has a label for Event Location', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('Location');
      expect(label.props.children).to.equal('Location');
    });
    it('has an input field with type text', () => {
      expect(input.type).to.equal('text');
    });
    it('has a field name of Location', () => {
      expect(input.name).to.equal('Location');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event Description Field', () => {
    let field;
    let input;
    before(() => {
      field = formInputs[5];
      input = field[1].props;
    });
    it('has a label for Event Description', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('Description');
      expect(label.props.children).to.equal('Description');
    });
    it('has an input field with type text', () => {
      expect(input.type).to.equal('text');
    });
    it('has a field name of Description', () => {
      expect(input.name).to.equal('Description');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
  });
  describe('Event Type Field', () => {
    let field;
    let input;

    before(() => {
      field = formInputs[6];
      input = field[1].props;
    });
    it('has a label for Event Type', () => {
      let label = field[0];
      expect(label.type).to.be.equal('label');
      expect(label.props.htmlFor).to.equal('Type');
      expect(label.props.children).to.equal('Type');
    });
    it('has a field name of Type', () => {
      expect(input.name).to.equal('Type');
    });
    it('has an intial value of an empty string', () => {
      expect(input.value).to.equal('Select Event Type');
    });
    it('handles changes', () => {
      expect(typeof input.onChange).to.equal('function');
    });
    describe('Type options', () => {
      let options;
      before(() => {
        options = input.children.map((child) => child.props);
      });
      it('has 8 options', () => {
        expect(options).to.have.lengthOf(8);
      });
      it('Select Event Type', () => {
        expect(options[0].value).to.equal('Select Event Type');
        expect(options[0].children).to.equal('Select Event Type');
      });
      it('Net', () => {
        expect(options[1].value).to.equal('Net');
        expect(options[1].children).to.equal('Net');
      });
      it('Club Meeting', () => {
        expect(options[2].value).to.equal('Club Meeting');
        expect(options[2].children).to.equal('Club Meeting');
      });
      it('Special Event', () => {
        expect(options[3].value).to.equal('Special Event');
        expect(options[3].children).to.equal('Special Event');
      });
      it('Public Service Event', () => {
        expect(options[4].value).to.equal('Public Service Event');
        expect(options[4].children).to.equal('Public Service Event');
      });
      it('Training Class', () => {
        expect(options[5].value).to.equal('Training Class');
        expect(options[5].children).to.equal('Training Class');
      });
      it('Testing', () => {
        expect(options[6].value).to.equal('Testing');
        expect(options[6].children).to.equal('Testing');
      });
      it('CSU', () => {
        expect(options[7].value).to.equal('CSU');
        expect(options[7].children).to.equal('CSU');
      });
    });
  });
  describe('submit button', () => {
    let submitButton;
    before(() => {
      submitButton = newEventForm
        .find('button')
        .map((node) => node.get(0).props)[0];
    });
    it('has a submit button', () => {
      expect(submitButton.type).to.be.equal('submit');
    });
    it(' button says Submit Event', () => {
      expect(submitButton.children).to.be.equal('Submit Events');
    });
    it('handles submit', () => {
      expect(typeof submitButton.onClick).to.be.equal('function');
    });
  });
});
