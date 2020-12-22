import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import OfficerYear from './OfficerYear';

//Tests: 7 passing 0pending/failing
describe('Officer year row', () => {
  let yearCells;
  const mockOfficerHistory = {
    startYear: 1948,
    endYear: 1949,
    President: 'D.C.Burger, W9MYK',
    VicePresident: 'Frank Golder, W9AAM',
    Secretary: 'Craig Allen, W9IHT',
    Treasurer: 'Alice Newcomb, W9QMS',
    Custodian: 'Unknown',
  };
  before(() => {
    let year = shallow(<OfficerYear officer={mockOfficerHistory} />);
    yearCells = year.find('td').map((node) => node.get(0).props.children);
  });
  it('has 6 cells', () => {
    expect(yearCells).to.have.lengthOf(6);
  });
  it('first cell is the year range', () => {
    expect(yearCells[0].join('')).to.equal('1948-1949');
  });
  it('second cell is the president', () => {
    expect(yearCells[1]).to.equal(mockOfficerHistory.President);
  });
  it('third cell is the vice president', () => {
    expect(yearCells[2]).to.equal(mockOfficerHistory.VicePresident);
  });
  it('fourth cell is the secretary', () => {
    expect(yearCells[3]).to.equal(mockOfficerHistory.Secretary);
  });
  it('fifth cell is the treasurer', () => {
    expect(yearCells[4]).to.equal(mockOfficerHistory.Treasurer);
  });
  it('sixth cell is the custodian', () => {
    expect(yearCells[5]).to.equal(mockOfficerHistory.Custodian);
  });
});
