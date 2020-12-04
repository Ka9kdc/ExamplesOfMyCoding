import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import Committees from './Committees';

//Tests: 70 passing 1pending/failing
describe('MembershipForm Badge', () => {
  let commetteeForm;
  let commetteeOptions;
  before(() => {
    commetteeForm = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/MembershipForm']}>
          <Committees />
        </rrd.MemoryRouter>
      </Provider>
    );
    commetteeOptions = commetteeForm
      .find('input')
      .map((node) => node.get(0).props);
  });
  it('18 input fields', () => {
    expect(commetteeOptions).to.have.lengthOf(18);
  });
  describe('Checkbox - RAB', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[0];
    });
    it('name is Repeaters', () => {
      expect(inputField.name).to.be.equal('Repeaters');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    xit('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - meeting programs', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[1];
    });
    it('name is meeting programs', () => {
      expect(inputField.name).to.be.equal('MeetingPrograms');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Club Officer', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[2];
    });
    it('name is ClubOfficer', () => {
      expect(inputField.name).to.be.equal('ClubOfficer');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Membership', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[3];
    });
    it('name is Membership', () => {
      expect(inputField.name).to.be.equal('MembershipCommittee');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Public Service', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[4];
    });
    it('name is Public Service', () => {
      expect(inputField.name).to.be.equal('PublicService');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Field Day', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[5];
    });
    it('name is FieldDay', () => {
      expect(inputField.name).to.be.equal('FieldDay');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Fundraising', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[6];
    });
    it('name is Fundraising', () => {
      expect(inputField.name).to.be.equal('Fundraising');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - VE Testing', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[7];
    });
    it('name is VEtesting', () => {
      expect(inputField.name).to.be.equal('VEtesting');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Training', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[8];
    });
    it('name is Training', () => {
      expect(inputField.name).to.be.equal('Training');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Net', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[9];
    });
    it('name is Net', () => {
      expect(inputField.name).to.be.equal('Net');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - csuTrailer', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[10];
    });
    it('name is csuTrailer', () => {
      expect(inputField.name).to.be.equal('csuTrailer');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Publicity', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[11];
    });
    it('name is Publicity', () => {
      expect(inputField.name).to.be.equal('Publicity');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Hamfest', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[12];
    });
    it('name is Hamfest', () => {
      expect(inputField.name).to.be.equal('Hamfest');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Youth Programs', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[13];
    });
    it('name is Youth Programs', () => {
      expect(inputField.name).to.be.equal('YouthPrograms');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Hamletter', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[14];
    });
    it('name is Hamletter', () => {
      expect(inputField.name).to.be.equal('HamLetter');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - Website', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[15];
    });
    it('name is Website', () => {
      expect(inputField.name).to.be.equal('Website');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
  });
  describe('Checkbox - other', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[17];
    });
    it('name is other', () => {
      expect(inputField.name).to.be.equal('other');
    });
    it('type is a text field', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('handles change', () => {
      expect(inputField.onChange).to.be.a.change;
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.empty;
    });
    describe('check box next to it', () => {
      let box;
      before(() => {
        box = commetteeOptions[16];
      });
      it('has no name property', () => {
        expect(box.name).to.be.undefined;
      });
      it('type is a checkbox', () => {
        expect(box.type).to.be.equal('checkbox');
      });
    });
  });
});
