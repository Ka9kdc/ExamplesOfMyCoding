import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ContactUs from './ContactUs';
import AddressBlock from './addressblock';

//Tests: 34 passing 0pending/failing
describe('Contact us page', () => {
  let ContactUsPage;
  let pageDivs;
  let sections;
  let pageLinks;
  before(() => {
    ContactUsPage = shallow(<ContactUs />);
    pageDivs = ContactUsPage.find('div').map((node) => node.get(0).props);
    sections = pageDivs[1].children;
    pageLinks = ContactUsPage.find('Link').map((node) => node.get(0).props);
  });
  it('has a tittle of contacting wcra', () => {
    expect(pageDivs[0].className).to.equal('Title');
    expect(pageDivs[0].children).to.equal('Contacting WCRA');
  });
  it('renders the club addresss', () => {
    expect(ContactUsPage.find(AddressBlock)).to.have.lengthOf(1);
  });
  it('has 3 sections of content', () => {
    expect(sections).to.have.lengthOf(3);
  });
  describe('first section is the contact info from the board', () => {
    let header;
    let officerlist;
    before(() => {
      let thisSection = sections[0].props.children;
      header = thisSection.filter((child) => child.type === 'h1')[0].props
        .children;
      officerlist = thisSection
        .filter((child) => child.type === 'ul')[0]
        .props.children.map((child) => child.props.children);
    });
    it('has a header of WCRA Officers', () => {
      expect(header).to.be.equal('WCRA Officers');
    });
    it('List the club president first', () => {
      expect(officerlist[0]).to.include('President -');
    });
    it('has a link to the President reflector', () => {
      expect(officerlist[0][2].type).to.be.equal('a');
      expect(officerlist[0][2].props.href).to.be.equal(
        'mailto:president@w9ccu.org'
      );
    });
    it('List the club Vice president second', () => {
      expect(officerlist[1]).to.include('Vice President -');
    });
    it('has a link to the Vice President reflector', () => {
      expect(officerlist[1][2].type).to.be.equal('a');
      expect(officerlist[1][2].props.href).to.be.equal(
        'mailto:vicepresident@w9ccu.org'
      );
    });
    it('List the club treasurer third', () => {
      expect(officerlist[2]).to.include('Treasurer -');
    });
    it('has a link to the treasure reflector', () => {
      expect(officerlist[2][2].type).to.be.equal('a');
      expect(officerlist[2][2].props.href).to.be.equal(
        'mailto:treasurer@w9ccu.org'
      );
    });
    it('List the club secretary fourth', () => {
      expect(officerlist[3]).to.include('Secretary -');
    });
    it('has a link to the secretary reflector', () => {
      expect(officerlist[3][2].type).to.be.equal('a');
      expect(officerlist[3][2].props.href).to.be.equal(
        'mailto:secretary@w9ccu.org'
      );
    });
    it('List the club Custodian last', () => {
      expect(officerlist[4]).to.include('Custodian -');
    });
    it('has a link to the Custodian reflector', () => {
      expect(officerlist[4][2].type).to.be.equal('a');
      expect(officerlist[4][2].props.href).to.be.equal(
        'mailto:custodian@w9ccu.org'
      );
    });
    it('List the club all board last', () => {
      expect(officerlist[5]).to.include('Email the Full Board at');
    });
    it('has a link to the President reflector', () => {
      expect(officerlist[5][2].type).to.be.equal('a');
      expect(officerlist[5][2].props.href).to.be.equal(
        'mailto:board@w9ccu.org'
      );
    });
    it('has a link to the officer history page', () => {
      expect(pageLinks[0].to).to.equal('/OfficerHistory');
      expect(pageLinks[0].children).to.equal('chronological list');
    });
  });
  describe('second section has contact for committee chairs', () => {
    let header;
    let committeelist;
    before(() => {
      let thisSection = sections[1].props.children;
      header = thisSection.filter((child) => child.type === 'h1')[0].props
        .children;
      committeelist = thisSection
        .filter((child) => child.type === 'table')[0]
        .props.children.props.children.map((child) => child.props.children);
    });
    it('has a header of Committees', () => {
      expect(header).to.be.equal('Committees');
    });
    it('has a table with 12 rows and a header row', () => {
      expect(committeelist).to.have.lengthOf(13);
    });
    it('header row list column titles', () => {
      let headerRow = committeelist[0];
      expect(headerRow[0].type).to.equal('th');
      expect(headerRow[0].props.children).to.equal('Committee');
      expect(headerRow[1].type).to.equal('th');
      expect(headerRow[1].props.children).to.equal('Chair/Members');
    });
    it('first row is Field Day and has a link for the field day refelector', () => {
      let thisRow = committeelist[1].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Field Day');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:field-day@w9ccu.org');
    });
    it('second row is hamletter and has a link for the info refelector', () => {
      let thisRow = committeelist[2].map((child) => child.props.children);
      expect(thisRow[0].type).to.equal('a');
      expect(thisRow[0].props.href).to.equal('Hamletter.html');
      expect(thisRow[0].props.children).to.equal('Hamletter');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:info@w9ccu.org');
    });
    it('third row is hamfest and has a link for the info refelector', () => {
      let thisRow = committeelist[3].map((child) => child.props.children);
      expect(thisRow[0].type.displayName).to.equal('Link');
      expect(thisRow[0].props.to).to.equal('/Hamfest');
      expect(thisRow[0].props.children).to.equal('Hamfest');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:hamfest@w9ccu.org');
    });
    it('four row is Net Coordinator and has a link for the field day refelector', () => {
      let thisRow = committeelist[4].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Net Coordinator');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:nets@w9ccu.org');
    });
    it('fifth row is Programs and has a link for an email adrees', () => {
      let thisRow = committeelist[5].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Programs');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.include('mailto:');
      expect(thisRow[1].props.href).to.include('@');
    });
    it('sixth row is Public Service and has a link for an email adrees', () => {
      let thisRow = committeelist[6].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Public Service');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.include('mailto:');
      expect(thisRow[1].props.href).to.include('@');
    });
    it('seventh row is Public Relation and has a link for the info refelector', () => {
      let thisRow = committeelist[7].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Public Relations');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:info@w9ccu.org');
    });
    it('eighth row is Repeater Advisory Board (RAB) and has a link for an email adrees', () => {
      let thisRow = committeelist[8].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Repeater Advisory Board (RAB)');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.include('mailto:');
      expect(thisRow[1].props.href).to.include('@');
    });
    it('ninth row is for the whole rab, has a link for the rab refelector and has a link for an email adrees', () => {
      let thisRow = committeelist[9].map((child) => child.props.children);
      expect(thisRow[0].type).to.equal('a');
      expect(thisRow[0].props.href).to.equal('mailto:rab@w9ccu.org');
      expect(thisRow[0].props.children).to.equal('Email entire RAB');
      expect(thisRow[1][0].type).to.equal('a');
      expect(thisRow[1][0].props.href).to.include('mailto:');
      expect(thisRow[1][0].props.href).to.include('@');
    });
    it('tenth row is hamfest and has a link for the info refelector', () => {
      let thisRow = committeelist[10].map((child) => child.props.children);
      expect(thisRow[0].type.displayName).to.equal('Link');
      expect(thisRow[0].props.to).to.equal('/Training');
      expect(thisRow[0].props.children).to.equal('Training and Education');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:info@w9ccu.org');
    });
    it('eleventh row is testing and has a link for an email adrees', () => {
      let thisRow = committeelist[11].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('VE Testing');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.include('mailto:');
      expect(thisRow[1].props.href).to.include('@');
    });
    it('tweleth row is website and has a link for the info refelector', () => {
      let thisRow = committeelist[12].map((child) => child.props.children);
      expect(thisRow[0]).to.equal('Web site, online technical support');
      expect(thisRow[1].type).to.equal('a');
      expect(thisRow[1].props.href).to.equal('mailto:webmaster@w9ccu.org');
    });
  });
  describe('third section is for general inquires', () => {
    let header;
    let generalText;
    before(() => {
      let thisSection = sections[2].props.children;
      header = thisSection.filter((child) => child.type === 'h1')[0].props
        .children;
      generalText = thisSection
        .filter((child) => child.type === 'p')
        .map((child) => child.props.children);
    });
    it('has a header of general inquiries', () => {
      expect(header).to.equal('General Inquiries');
    });
    it('has the club phone number', () => {
      expect(generalText[1]).to.include('(630) 923-5447');
    });
  });
});
