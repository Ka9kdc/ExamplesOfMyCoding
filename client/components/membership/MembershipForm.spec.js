import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import axios from 'axios';
import { mockAdapter } from 'axios-mock-adapter';
import MembershipForm from './membershipForm';
import Badge from './Badge';
import Committees from './Committees';
import MemberInfomation from './MemberInfomation';

//Tests: 33 passing 0 pending/failling - should add more to account for conditional renders
describe('membership online renewal form', () => {
  let membershipForm;
  describe('full mount', () => {
    let sections;
    before(() => {
      membershipForm = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['./MembershipForm']}>
            <MembershipForm />
          </rrd.MemoryRouter>
        </Provider>
      );
      sections = membershipForm.find('div').map((node) => node.get(0).props);

    });
    it('does not initially render the badge component', () => {
      expect(membershipForm.find(Badge)).to.have.lengthOf(0);
    });
    it('renders the memberinformation component', () => {
      expect(membershipForm.find(MemberInfomation)).to.have.lengthOf(1);
    });
    it('renders the committee component', () => {
      expect(membershipForm.find(Committees)).to.have.lengthOf(1);
    });
    it('has a title of Membership signup', () => {
      let [title] = sections.filter((props) => props.className === 'Subtitle');
      expect(title.children).to.be.equal('Membership Signup');
    });
    // describe('badge div')
    describe('form div', () => {
      let form;
      let labels;
      before(() => {
        form = sections
          .filter((props) => props.className === 'form')[0]
          .children.filter((div) => div.props)
          .map((div) => div.props.children)
          .filter((div) => div !== undefined);
        labels = membershipForm
          .find('label')
          .map((node) => node.get(0).props.children);
      });
      it('renders 3 input fields with labels', () => {
        expect(form).to.have.lengthOf(3);
      });
      it('has a label for membership type', () => {
        expect(labels).to.include('Membership Type: ');
      });
      it("has a label for Today's Date", () => {
        expect(labels).to.include("Today's Date: ");
      });
      it('has a label for Due Year', () => {
        expect(labels).to.include('Due Year: ');
      });
      describe('first input - a select drop down menu with membership types', () => {
        let menu;
        let membershipTypeChoices;
        let fieldLabel;
        before(() => {
          fieldLabel = form[0][0].props;
          menu = form[0][1];
          membershipTypeChoices = menu.props.children.map(
            (child) => child.props
          );
        });
        it('has a label for Membership type', () => {
          expect(fieldLabel.children).to.be.equal('Membership Type: ');
        });
        it('has a htmlFor for Membershiptype', () => {
          expect(fieldLabel.htmlFor).to.be.equal('MembershipType');
        });
        it('field type is a select', () => {
          expect(menu.type).to.be.equal('select');
        });
        it('has an event name of Membership', () => {
          expect(menu.props.name).to.be.equal('Membership');
        });
        it('has 6 chooses', () => {
          expect(membershipTypeChoices).to.have.lengthOf(6);
        });
        it('has an option for Full at 26', () => {
          expect(membershipTypeChoices[0].value).to.be.equal('Full');
          expect(membershipTypeChoices[0].children).to.be.equal(
            'Regular $26.00 USD'
          );
        });
        it('has an option for Senior at 13', () => {
          expect(membershipTypeChoices[1].value).to.be.equal('Senior');
          expect(membershipTypeChoices[1].children).to.be.equal(
            'Senior (55+ & retired) $13.00 USD'
          );
        });
        it('has an option for Family at 39', () => {
          expect(membershipTypeChoices[2].value).to.be.equal('Family');
          expect(membershipTypeChoices[2].children).to.be.equal(
            'Family $39.00 USD'
          );
        });
        it('has an option for Student at 13', () => {
          expect(membershipTypeChoices[3].value).to.be.equal('Student');
          expect(membershipTypeChoices[3].children).to.be.equal(
            'Student $13.00 USD'
          );
        });
        it('has an option for Associate at 13', () => {
          expect(membershipTypeChoices[4].value).to.be.equal('Associate');
          expect(membershipTypeChoices[4].children).to.be.equal(
            'Associate (No license) $13.00 USD'
          );
        });
        it('has an option for Lifetime at 0', () => {
          expect(membershipTypeChoices[5].value).to.be.equal('Lifetime');
          expect(membershipTypeChoices[5].children).to.be.equal('Lifetime');
        });
      });
      describe("inport field 2 - today's date", () => {
        let field;
        let fieldLabel;
        before(() => {
          field = form[1][1];
          fieldLabel = form[1][0].props;
        });
        it("has a label for Today's Date", () => {
          expect(fieldLabel.children).to.be.equal("Today's Date: ");
        });
        it('has a htmlFor for Todays Date', () => {
          expect(fieldLabel.htmlFor).to.be.equal('todaysDate');
        });
        it('field type is a select', () => {
          expect(field.type).to.be.equal('input');
        });
        it('has an input type of date', () => {
          expect(field.props.type).to.be.equal('date');
        });
        it('has an input name of RenewalDate', () => {
          expect(field.props.name).to.be.equal('RenewalDate');
        });
        it('the field is required', () => {
          expect(field.props.required).to.be.true;
        });
        it('handles change', () => {
          //  not sure if this expect is written right
          expect(field.props.onChange).to.be.a.change;
        });
      });
      describe('input field 3 - a select drop down menu for due year', () => {
        let menu;
        let dueYearChoices;
        let fieldLabel;
        before(() => {
          fieldLabel = form[2][0].props;
          menu = form[2][1];
          dueYearChoices = menu.props.children.map((child) => child.props);
        });
        it('has a label for Due Year', () => {
          expect(fieldLabel.children).to.be.equal('Due Year: ');
        });
        it('has a htmlFor for DueYear', () => {
          expect(fieldLabel.htmlFor).to.be.equal('DueYear');
        });
        it('field type is a select', () => {
          expect(menu.type).to.be.equal('select');
        });
        it('has an event name of DueYear', () => {
          expect(menu.props.name).to.be.equal('DueYear');
        });
        it('has 2 chooses', () => {
          expect(dueYearChoices).to.have.lengthOf(2);
        });
        it('has an option for 2021', () => {
          expect(dueYearChoices[0].value).to.be.equal('2021');
          expect(dueYearChoices[0].children).to.be.equal('2021');
        });
        it('has an option for 2020', () => {
          expect(dueYearChoices[1].value).to.be.equal('2020');
          expect(dueYearChoices[1].children).to.be.equal('2020');
        });
      });
    });
  });
});
