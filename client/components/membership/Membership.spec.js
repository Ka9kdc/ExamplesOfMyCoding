import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Membership from './Membership';
import AddressBlock from '../AboutUs/addressblock';

//Tests: 19 passing 0pending/failing
describe('Membership main page', () => {
  let membershipPage;
  let sections;
  before(() => {
    membershipPage = shallow(<Membership />);
    sections = membershipPage.find('p').map((node) => node.get(0).props);
  });
  it('renders an address block', () => {
    expect(membershipPage.find(AddressBlock)).to.have.lengthOf(1);
  });
  it('renders a title of Join WCRA', () => {
    let [title] = membershipPage
      .find('div')
      .map((node) => node.get(0).props)
      .filter((prop) => prop.className === 'Title');
    expect(title.children).to.be.equal('Join WCRA');
  });
  describe('first paragraph', () => {
    let thisSection;
    before(() => {
      thisSection = sections[0].children;
    });
    it('has Full membership in bold', () => {
      expect(thisSection[0].type).to.be.equal('b');
      expect(thisSection[0].props.children).to.be.equal('Full WCRA membership');
    });
    it('includes a description of full membership', () => {
      expect(thisSection[1]).to.include(
        'currently holding an Amateur Radio license '
      );
    });
    it('has Associate membership in bold', () => {
      expect(thisSection[2].type).to.be.equal('b');
      expect(thisSection[2].props.children).to.be.equal('Associate membership');
    });
    it('includes a description of associate membership', () => {
      expect(thisSection[3]).to.include('do not currently hold');
    });
    it('has a link to bylaws', () => {
      let link = thisSection[4].props;
      expect(link.to).to.be.equal('/Bylaws');
      expect(link.children).to.be.equal(' bylaws');
    });
  });
  describe('second paragraph', () => {
    let thisSection;
    before(() => {
      thisSection = sections[1].children;
    });
    it('includes annual dues info', () => {
      expect(thisSection).to.include('Annual dues');
    });
    it('includes the price of full membership', () => {
      expect(thisSection).to.include('$26 for Full Membership,');
    });
    it('includes the price of family membership', () => {
      expect(thisSection).to.include(
        'Family Memberships (same household) are $39'
      );
    });
    it('includes the price of senoir membership', () => {
      expect(thisSection).to.include('Senior Citizens (age 65 and over)');
    });
    it('includes the price of associate membership', () => {
      expect(thisSection).to.include('Associate memberships are $13');
    });
    it('includes the price of student membership', () => {
      expect(thisSection).to.include('Student Memberships are $13.');
    });
    it('includes due date', () => {
      expect(thisSection).to.include('Full dues are charged from January 1');
    });
  });
  describe('third paragraph', () => {
    let thisSection;
    before(() => {
      thisSection = sections[2].children;
    });
    it('includes info about applications', () => {
      expect(thisSection[0]).to.include('Membership applications');
    });
    it('has a link to online form', () => {
      let link = thisSection[1].props;
      expect(thisSection[0]).to.include('accepted online');
      expect(link.to).to.be.equal('/membershipForm');
      expect(link.children).to.be.equal(' form');
    });

    it('has a link to hardcopies', () => {
      let link = thisSection[3].props;
      expect(thisSection[2]).to.include('hardcopied');
      expect(link.to).to.be.equal('/TextApplication');
      expect(link.children).to.be.equal('HTML text');
    });
    it('has a link to hardcopies - pdf', () => {
      let link = thisSection[5].props;
      expect(thisSection[2]).to.include('hardcopied');
      expect(link.href).to.be.equal(
        'Document/MembershipApplicationEditedB.pdf'
      );
      expect(link.children).to.be.equal(' PDF');
    });
    it('includes can be mailed or handed in', () => {
      expect(thisSection[6]).to.include('club meeting or mailed');
    });
  });
});
