import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AddressBlock from './addressblock';

//Tests: 3 passing 0pending/failing
describe('Address block', () => {
  let address;
  before(() => {
    const block = shallow(<AddressBlock />);
    address = block.find('p').map((node) => node.get(0).props.children);
  });
  it('has the club name on the first line', () => {
    expect(address[0]).to.equal('Wheaton Community Radio Amateurs (or WCRA)');
  });
  it('has the po box on the second line', () => {
    expect(address[1]).to.equal('PO Box 1055');
  });
  it('has the city, state and zip on the third line', () => {
    expect(address[2]).to.equal('Wheaton, IL 60187-1055');
  });
});
