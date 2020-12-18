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
import { updateMemberBadge, updateMemberInfo } from '../../redux/membership';

//Tests: 76 passing 0 pending/failling - should add more to account for conditional renders
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
      // console.log(sections)
    });
    it('does not initially render the badge component - badge desired = false', () => {
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
    describe('badge div when badge desired = false', () => {
      let badgeForm;
      let check;
      let label;
      before(() => {
        badgeForm = sections.filter((props) => props.className === 'Right')[0]
          .children.props.children;
        check = badgeForm.filter((child) => child.type === 'input')[0];
        label = badgeForm.filter((child) => child.type === 'label')[0];
        console.log('label', label);
      });
      it('has two children. an input and its label', () => {
        expect(check.type).to.be.equal('input');
        expect(label.type).to.be.equal('label');
      });
      it('has an input checkbox field', () => {
        expect(check.type).to.be.equal('input');
        expect(check.props.type).to.be.equal('checkbox');
      });
      it('has a check box for desired', () => {
        expect(check.props.name).to.be.equal('Desired');
      });
      it('changes the state of desired on click', () => {
        expect(typeof check.props.onChange).to.be.equal('function');
      });
      it('has a html label for desired', () => {
        expect(label.props.htmlFor).to.be.equal('Desired');
      });
      it('the labels says badge desired', () => {
        expect(label.props.children).to.be.equal('Get A Club Badge');
      });
    });
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
        it('handles change', () => {
          //  not sure if this expect is written right
          expect(typeof menu.props.onChange).to.be.equal('function');
          expect(menu.props.onChange).to.be.a.change;
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
          expect(typeof field.props.onChange).to.be.equal('function');
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
        it('handles change', () => {
          //  not sure if this expect is written right
          expect(typeof menu.props.onChange).to.be.equal('function');
          expect(menu.props.onChange).to.be.a.change;
        });
      });
    });
    describe('has an initially has a submit form button', () => {
      let button;
      before(() => {
        button = membershipForm.find('button');
      });
      it('has text of Submit Form', () => {
        expect(button.text()).to.equal('Submit Form');
      });
      it('submits the form when clicked', () => {
        let click = button.map((node) => node.get(0).props)[0].onClick;
        expect(typeof click).to.be.equal('function');
      });
    });
  });
  describe('full mount with badge desired and lifeTime', () => {
    let sections;
    before(() => {
      store.dispatch(updateMemberBadge({ Desired: true }));
      store.dispatch(updateMemberInfo({ Membership: 'Lifetime' }));
      membershipForm = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['./MembershipForm']}>
            <MembershipForm />
          </rrd.MemoryRouter>
        </Provider>
      );
      sections = membershipForm.find('div').map((node) => node.get(0).props);
    });
    it('will render the badge component - badge desired = true', () => {
      expect(membershipForm.find(Badge)).to.have.lengthOf(1);
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
    it('has text of Submit Form', () => {
      expect(membershipForm.find('button').text()).to.equal('Submit Form');
    });
    it('has a message regarding lifetime', () => {
      expect(membershipForm.find('h2').text()).to.include(
        'Lifetime Membership status'
      );
    });
    describe('badge div when badge desired = true', () => {
      let badgeForm;
      let check;
      let label;
      before(() => {
        badgeForm = sections.filter((props) => props.className === 'Right')[0]
          .children.props.children;
        check = badgeForm[0].props.children.filter(
          (child) => child.type === 'input'
        )[0];
        label = badgeForm[0].props.children.filter(
          (child) => child.type === 'label'
        )[0];
      });
      it('has two children. Div - desired checkbox and badge', () => {
        expect(badgeForm[0].type).to.be.equal('div');
        expect(badgeForm[1].type.displayName).to.be.equal('Connect(Badge)');
      });
      it('has an input checkbox field', () => {
        expect(check.type).to.be.equal('input');
        expect(check.props.type).to.be.equal('checkbox');
      });
      it('has a check box for desired', () => {
        expect(check.props.name).to.be.equal('Desired');
      });
      it('changes the state of desired on click', () => {
        expect(typeof check.props.onChange).to.be.equal('function');
      });
      it('has a html label for desired', () => {
        expect(label.props.htmlFor).to.be.equal('Desired');
      });
      it('the labels says badge desired', () => {
        expect(label.props.children).to.be.equal('Get A Club Badge');
      });
    });
    describe('form div - life time membership was selected', () => {
      let form;
      let labels;
      before(() => {
        form = sections
          .filter((props) => props.className === 'form')[0]
          .children.filter((div) => div.props)
          .map((div) => div.props.children)
          .filter((div) => Array.isArray(div));
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

      it('has an input for Membership', () => {
        expect(form[0][1].props.name).to.be.equal('Membership');
      });
      it('membership has 6 choices', () => {
        let membershipTypeChoices = form[0][1].props.children.map(
          (child) => child.props
        );
        expect(membershipTypeChoices).to.have.lengthOf(6);
      });
      it('has a htmlFor for Todays Date', () => {
        expect(form[1][0].props.htmlFor).to.be.equal('todaysDate');
      });
      it('has an input type of date', () => {
        expect(form[1][1].props.type).to.be.equal('date');
      });
      it('has an input name of RenewalDate', () => {
        expect(form[1][1].props.name).to.be.equal('RenewalDate');
      });
      it('due year has 2 chooses', () => {
        let dueYearChoices = form[2][1].props.children.map(
          (child) => child.props
        );
        expect(dueYearChoices).to.have.lengthOf(2);
      });
    });
  });
  describe('full mount with family membership', () => {
    let sections;
    before(() => {
      store.dispatch(updateMemberInfo({ Membership: 'Family' }));
      membershipForm = mount(
        <Provider store={store}>
          <rrd.MemoryRouter initialEntries={['./MembershipForm']}>
            <MembershipForm />
          </rrd.MemoryRouter>
        </Provider>
      );
      sections = membershipForm.find('div').map((node) => node.get(0).props);
    });
    it('will render the badge component - badge desired = true', () => {
      expect(membershipForm.find(Badge)).to.have.lengthOf(1);
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

    describe('has an initially has a submit form button', () => {
      let button;
      before(() => {
        button = membershipForm.find('button');
      });
      it('has text of Add Family Member', () => {
        expect(button.text()).to.equal('Add Family Member');
      });
      it('adds a family member  when clicked', () => {
        let click = button.map((node) => node.get(0).props)[0].onClick;
        expect(typeof click).to.be.equal('function');
      });
      it('is a link "/membershipConfirmation"', () => {
        expect(membershipForm.find('a').get(0).props.href).to.be.equal(
          '/membershipConfirmation'
        );
      });
    });

    describe('form div', () => {
      let form;
      let labels;
      before(() => {
        form = sections
          .filter((props) => props.className === 'form')[0]
          .children.filter((div) => div.props)
          .map((div) => div.props.children)
          .filter((div) => Array.isArray(div));
        labels = membershipForm
          .find('label')
          .map((node) => node.get(0).props.children);
      });
      it('still renders the same 3 input fields with labels', () => {
        expect(form).to.have.lengthOf(3);
        expect(labels).to.include('Membership Type: ');
        expect(labels).to.include("Today's Date: ");
        expect(labels).to.include('Due Year: ');
      });
      it('membership has 6 choices', () => {
        let membershipTypeChoices = form[0][1].props.children.map(
          (child) => child.props
        );
        expect(membershipTypeChoices).to.have.lengthOf(6);
      });
      it('has an input type of date', () => {
        expect(form[1][1].props.type).to.be.equal('date');
      });
      it('due year has 2 chooses', () => {
        let dueYearChoices = form[2][1].props.children.map(
          (child) => child.props
        );
        expect(dueYearChoices).to.have.lengthOf(2);
      });
    });
  });
});
