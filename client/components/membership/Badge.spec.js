import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import Badge from './Badge';
import { updateMemberBadge } from '../../redux/membership';

//Tests 29 passing 0pending/failing
//handle change tests are commented out they pass but are not testing what i want them to
describe('MembershipForm Badge', () => {
  let badgeForm;
  let inputs;
  before(async () => {
    await store.dispatch(updateMemberBadge({ badgeType: 'Lanyard' }));
    badgeForm = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/MembershipForm']}>
          <Badge />
        </rrd.MemoryRouter>
      </Provider>
    );
    inputs = badgeForm.find('input').map((node) => node.get(0).props);
  });
  it('7 input fields', () => {
    expect(inputs).to.have.lengthOf(7);
  });
  describe('first input field - Year Lisecned', () => {
    let inputField;
    before(() => {
      inputField = inputs[0];
    });
    it('name is licenseYear', () => {
      expect(inputField.name).to.be.equal('LicenseYear');
    });
    it('type is a number', () => {
      expect(inputField.type).to.be.equal('number');
    });
    // it('handles change', () => {
    //     //not sure if this expect is written right
    //     expect(inputField.onChange).to.be.a.change
    // })
  });
  describe('Second input field - Badge Name', () => {
    let inputField;
    before(() => {
      inputField = inputs[1];
    });
    it('name is badgeName', () => {
      expect(inputField.name).to.be.equal('badgeName');
    });
    it('type is a text', () => {
      expect(inputField.type).to.be.equal('text');
    });
    //  it('handles change', () => {
    //      expect(inputField.onChange).to.be.a.change
    //  })
    it('has a placeholder of name', () => {
      expect(inputField.placeholder).to.be.equal('Name');
    });
  });
  describe('Checkbox - Arrl logo', () => {
    let inputField;
    before(() => {
      inputField = inputs[2];
    });
    it('name is ArrlLogo', () => {
      expect(inputField.name).to.be.equal('ArrlLogo');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    //  it('handles change', () => {
    //      expect(inputField.onChange).to.be.a.change
    //  })
  });
  describe('badgeTypes', () => {
    let radioFields;
    before(() => {
      radioFields = inputs.filter((input) => input.type === 'radio');
    });
    it('has 4 options', () => {
      expect(radioFields).to.have.lengthOf(4);
    });
    it('option 1 = Notch', () => {
      expect(radioFields[0].value).to.be.equal('Notch');
    });
    it('option 2 = Magnet', () => {
      expect(radioFields[1].value).to.be.equal('Magnet');
    });
    it('option 3 = Lanyard', () => {
      expect(radioFields[2].value).to.be.equal('Lanyard');
    });
    it('option 4 = Pin', () => {
      expect(radioFields[3].value).to.be.equal('Pin');
    });
    it('name = badgeType', () => {
      expect(radioFields[0].name).to.be.equal('badgeType');
      expect(radioFields[1].name).to.be.equal('badgeType');
      expect(radioFields[2].name).to.be.equal('badgeType');
      expect(radioFields[3].name).to.be.equal('badgeType');
    });
    //  it('handles change', () => {
    //     expect(radioFields[0].onChange).to.be.a.change
    //     expect(radioFields[1].onChange).to.be.a.change
    //     expect(radioFields[2].onChange).to.be.a.change
    //     expect(radioFields[3].onChange).to.be.a.change
    // })
  });
  describe('Color options', () => {
    let colorSelector;
    let colorOptions;
    before(() => {
      colorSelector = badgeForm.find('select').map((node) => node.get(0).props);
      colorOptions = colorSelector[0].children.map((color) => color.props);
    });
    it('has 8 options', () => {
      expect(colorOptions).to.have.lengthOf(8);
    });
    it('has a name of Color', () => {
      expect(colorSelector[0].name).to.be.equal('Color');
    });
    //  it('handles changes', () => {
    //      //not working the way i want it to be
    //      //I want these to detect if onchange is a function
    //      expect(colorSelector[0].onChange).to.be.a.change
    //  })
    it('First option have a value of an empty string and the text reads Choose a color', () => {
      expect(colorOptions[0].value).to.be.equal('');
      expect(colorOptions[0].children).to.be.equal('Choose-A-Color');
    });
    it('has an option with a value and text of White', () => {
      expect(colorOptions[1].value).to.be.equal('White');
      expect(colorOptions[1].children).to.be.equal('White');
    });
    it('has an option with a value and text of Black', () => {
      expect(colorOptions[2].value).to.be.equal('Black');
      expect(colorOptions[2].children).to.be.equal('Black');
    });
    it('has an option with a value and text of Green', () => {
      expect(colorOptions[3].value).to.be.equal('Green');
      expect(colorOptions[3].children).to.be.equal('Green');
    });
    it('has an option with a value and text of Brown', () => {
      expect(colorOptions[4].value).to.be.equal('Brown');
      expect(colorOptions[4].children).to.be.equal('Brown');
    });
    it('has an option with a value and text of Red', () => {
      expect(colorOptions[5].value).to.be.equal('Red');
      expect(colorOptions[5].children).to.be.equal('Red');
    });
    it('has an option with a value and text of Blue', () => {
      expect(colorOptions[6].value).to.be.equal('Blue');
      expect(colorOptions[6].children).to.be.equal('Blue');
    });
    it('has an option with a value and text of Red, White and Blue', () => {
      expect(colorOptions[7].value).to.be.equal('Red White and Blue');
      expect(colorOptions[7].children).to.be.equal('Red, White & Blue');
    });
  });
});
