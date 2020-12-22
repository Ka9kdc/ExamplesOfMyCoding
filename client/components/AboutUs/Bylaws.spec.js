import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Bylaws from './Bylaws';

//Tests: 17 passing 0pending/failling
describe('Bylaws page', () => {
  let bylawsPage;
  let pageDivs;
  let articleHeader;
  let groupHeaders;
  let officerPositions;
  before(() => {
    bylawsPage = shallow(<Bylaws />);
    pageDivs = bylawsPage.find('div').map((node) => node.get(0).props);
    articleHeader = bylawsPage
      .find('h1')
      .map((node) => node.get(0).props.children);
    groupHeaders = bylawsPage
      .find('h2')
      .map((node) => node.get(0).props.children);
    officerPositions = bylawsPage
      .find('h3')
      .map((node) => node.get(0).props.children);
  });

  it('has a title of WCRA bylays', () => {
    expect(pageDivs[0].className).to.equal('Title');
    expect(pageDivs[0].children).to.equal(
      'WHEATON COMMUNITY RADIO AMATEURS BYLAWS'
    );
  });

  it('has 11 articles plus a definition header', () => {
    expect(articleHeader).to.have.lengthOf(12);
    expect(articleHeader[0]).to.equal('DEFINITIONS');
  });

  it('first article is for procedures', () => {
    expect(articleHeader).to.include('ARTICLE I: PARLIAMENTARY PROCEDURE');
  });
  it('second article is for officers', () => {
    expect(articleHeader).to.include('ARTICLE II: OFFICERS');
  });
  it('has a subheader for Exec board', () => {
    expect(groupHeaders).to.include('Executive Board');
  });
  it('talks about the responsibilities of each exec board posistion', () => {
    expect(officerPositions).to.include('President');
    expect(officerPositions).to.include('Vice President');
    expect(officerPositions).to.include('Secretary');
    expect(officerPositions).to.include('Treasurer');
    expect(officerPositions).to.include('Property Custodian');
  });
  it('third article is for committees', () => {
    expect(articleHeader).to.include('ARTICLE III: COMMITTEES');
  });
  it('specifily list and talks about the following commitees', () => {
    expect(groupHeaders).to.include('Program Committee');
    expect(groupHeaders).to.include('Training Committee');
    expect(groupHeaders).to.include('Public Service/Emergency Committee');
    expect(groupHeaders).to.include('Public Relations Committee');
    expect(groupHeaders).to.include('Field Day Committee');
    expect(groupHeaders).to.include('Interference Committee');
    expect(groupHeaders).to.include('Hamfest Committee');
    expect(groupHeaders).to.include('Other positions');
  });
  it('fourth article is for membership', () => {
    expect(articleHeader).to.include('ARTICLE IV: MEMBERSHIP');
  });
  it('fifth article is for forfieting membership', () => {
    expect(articleHeader).to.include('ARTICLE V: FORFEITURE OF MEMBERSHIP');
  });

  it('sixth article is for due', () => {
    expect(articleHeader).to.include('ARTICLE VI: DUES');
  });
  it('seventh article is for vacancies', () => {
    expect(articleHeader).to.include('ARTICLE VII: VACANCIES');
  });
  it('eighth article is for meeting times', () => {
    expect(articleHeader).to.include('ARTICLE VIII: TIME OF MEETINGS');
  });
  it('ninth article is for quorum', () => {
    expect(articleHeader).to.include('ARTICLE IX: QUORUM');
  });
  it('tenth article is for trusty', () => {
    expect(articleHeader).to.include('ARTICLE X: CLUB STATION LICENSE TRUSTEE');
  });
  it('eleventh article is for rab', () => {
    expect(articleHeader).to.include(
      'ARTICLE XI: REPEATER ADMINISTRATIVE BOARD'
    );
  });
  it('talks about the orginization and structer of the RAB', () => {
    expect(groupHeaders).to.include('Organization');
    expect(groupHeaders).to.include('Meetings');
    expect(groupHeaders).to.include('Selection of Members');
    expect(groupHeaders).to.include('Administrative Functions');
    expect(groupHeaders).to.include('Requesting RAB Action');
    expect(groupHeaders).to.include('Reports');
    expect(groupHeaders).to.include('Vetoing RAB Action');
  });
});
