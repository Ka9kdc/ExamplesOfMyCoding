import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import MemberInfomation from './MemberInfomation';

//Tests 73 passing 0 pending/failing
describe.skip('membership information', () => {
  let membershipInfoForm;
  let inputs;
  let labels;
  before(() => {
    membershipInfoForm = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/MembershipForm']}>
          <MemberInfomation />
        </rrd.MemoryRouter>
      </Provider>
    );
    inputs = membershipInfoForm.find('input').map((node) => node.get(0).props);
    labels = membershipInfoForm.find('label').map((node) => node.get(0).props);
  });
  it('has 9 input fields and labels', () => {
    expect(inputs).to.have.lengthOf(8);
    expect(labels).to.have.lengthOf(9);
  });
  describe('first input field - first name', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[0];
      fieldLabel = labels[0];
    });
    it('label is for FirstName', () => {
      expect(fieldLabel.children).to.be.equal('First Name: ');
    });
    it('label is htmlfor FirstName', () => {
      expect(fieldLabel.htmlFor).to.be.equal('FirstName');
    });
    it('name is FirstName', () => {
      expect(inputField.name).to.be.equal('FirstName');
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('placeholder is a First Name', () => {
      expect(inputField.placeholder).to.be.equal('First Name');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('second input field - last name', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[1];
      fieldLabel = labels[1];
    });
    it('label is for LastName', () => {
      expect(fieldLabel.children).to.be.equal('Last Name: ');
    });
    it('label is htmlfor LastName', () => {
      expect(fieldLabel.htmlFor).to.be.equal('LastName');
    });
    it('name is LastName', () => {
      expect(inputField.name).to.be.equal('LastName');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('placeholder is a Last Name', () => {
      expect(inputField.placeholder).to.be.equal('Last Name');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('third input field - callsign', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[2];
      fieldLabel = labels[2];
    });
    it('label is for Callsign', () => {
      expect(fieldLabel.children).to.be.equal('Callsign: ');
    });
    it('label is htmlFor CallSing', () => {
      expect(fieldLabel.htmlFor).to.be.equal('Callsign');
    });
    it('name is Callsign', () => {
      expect(inputField.name).to.be.equal('Callsign');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('placeholder is a Callsign', () => {
      expect(inputField.placeholder).to.be.equal('Callsign');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('four input field - Email', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[3];
      fieldLabel = labels[3];
    });
    it('label is for Email', () => {
      expect(fieldLabel.children).to.be.equal('Email: ');
    });
    it('label is htmlFor Email', () => {
      expect(fieldLabel.htmlFor).to.be.equal('Email');
    });
    it('name is Email', () => {
      expect(inputField.name).to.be.equal('Email');
    });
    it('type is a email', () => {
      expect(inputField.type).to.be.equal('email');
    });
    it('size of 48', () => {
      expect(inputField.size).to.be.equal('48');
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('placeholder is Your email here (required)', () => {
      expect(inputField.placeholder).to.be.equal('Your email here (required)');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('five input field - phone', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[4];
      fieldLabel = labels[4];
    });
    it('label is for Phone', () => {
      expect(fieldLabel.children).to.be.equal('Phone Number: ');
    });
    it('label is htmlFor Phone', () => {
      expect(fieldLabel.htmlFor).to.be.equal('Phone');
    });
    it('name is Phone', () => {
      expect(inputField.name).to.be.equal('Phone');
    });
    it('type is a tel', () => {
      expect(inputField.type).to.be.equal('tel');
    });
    it('size of 15', () => {
      expect(inputField.size).to.be.equal('15');
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('placeholder is 000-000-0000', () => {
      expect(inputField.placeholder).to.be.equal('000-000-0000');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('six input field - street', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[5];
      fieldLabel = labels[5];
    });
    it('label is for Street', () => {
      expect(fieldLabel.children).to.be.equal('Street Address: ');
    });
    it('label is htmlFor Street', () => {
      expect(fieldLabel.htmlFor).to.be.equal('Street');
    });
    it('name is Street', () => {
      expect(inputField.name).to.be.equal('Street');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('size of 40%', () => {
      expect(inputField.size).to.be.equal('40%');
    });
    it('has a start value of an empty string', () => {
      expect(inputField.value).to.be.empty;
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('seven input field - City', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[6];
      fieldLabel = labels[6];
    });
    it('label is for City', () => {
      expect(fieldLabel.children).to.be.equal('City: ');
    });
    it('label is htmlFor City', () => {
      expect(fieldLabel.htmlFor).to.be.equal('City');
    });
    it('name is City', () => {
      expect(inputField.name).to.be.equal('City');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('has a start value of Wheaton', () => {
      expect(inputField.value).to.be.equal('Wheaton');
    });
    it('placeholder is City', () => {
      expect(inputField.placeholder).to.be.equal('City');
    });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('eigth input field - state', () => {
    let inputField;

    let stateOptions;
    let fieldLabel;
    before(() => {
      inputField = membershipInfoForm
        .find('select')
        .map((node) => node.get(0).props)[0];
      stateOptions = inputField.children.map((child) => child.props.children);
      fieldLabel = labels[7];
    });
    it('label is for State', () => {
      expect(fieldLabel.children).to.be.equal('State: ');
    });
    it('label is htmlFor State', () => {
      expect(fieldLabel.htmlFor).to.be.equal('State');
    });
    it('name is State', () => {
      expect(inputField.name).to.be.equal('State');
    });
    it('has an start value of IL', () => {
      expect(inputField.value).to.be.equal('IL');
    });
    it('has 50 options - one for each state', () => {
      expect(stateOptions).to.have.lengthOf(51);
    });
    it('has an option for IL', () => {
      expect(stateOptions).to.include('Illinois');
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
  describe('nine input field - Zip', () => {
    let inputField;
    let fieldLabel;
    before(() => {
      inputField = inputs[7];
      fieldLabel = labels[8];
    });
    it('label is for Zip', () => {
      expect(fieldLabel.children).to.be.equal('Zip Code: ');
    });
    it('label is htmlFor Zip', () => {
      expect(fieldLabel.htmlFor).to.be.equal('Zip');
    });
    it('name is Zip', () => {
      expect(inputField.name).to.be.equal('Zip');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('has a start value of 60187', () => {
      expect(inputField.value).to.be.equal(60187);
    });
    // it('placeholder is Zip', () => {
    //   expect(inputField.placeholder).to.be.equal('Zip');
    // });
    it('the field is required', () => {
      expect(inputField.required).to.be.true;
    });
    it('handles change', () => {
      //  not sure if this expect is written right
      expect(typeof inputField.onChange).to.equal('function');
    });
  });
});
