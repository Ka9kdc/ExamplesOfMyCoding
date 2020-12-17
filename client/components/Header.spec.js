import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from './Header';

//Tests 11 passing
describe('header', () => {
  let headerTextBox;
  let pics;
  before(() => {
    let wrapper = shallow(<Header />);
    headerTextBox = wrapper.find('div').get(0).props;
    pics = wrapper.find('img').map((node) => node.get(0));
  });
  it('has a class of wcra', () => {
    expect(headerTextBox.className).to.be.equal('wcra');
  });
  it('has 3 images', () => {
    expect(pics).to.have.lengthOf(3);
  });
  describe('first image', () => {
    let pic;
    before(() => {
      pic = pics[0].props;
    });
    it('has a sorce of little logo', () => {
      expect(pic.src).to.be.equal('Images/LittleLogo.png');
    });
    it('has a class of logo', () => {
      expect(pic.className).to.be.equal('logo');
    });
    it('it has an alt', () => {
      expect(pic.alt).to.be.equal('WCRA Logo');
    });
  });
  describe('second image', () => {
    let pic;
    before(() => {
      pic = pics[1].props;
    });
    it('has a sorce of bannerCall', () => {
      expect(pic.src).to.be.equal('Images/BannerCall.gif');
    });
    it('has a id of logo', () => {
      expect(pic.id).to.be.equal('name-logo');
    });
    it('it has an alt', () => {
      expect(pic.alt).to.be.equal(
        'Wheaton Community Radio Association Full Name Logo'
      );
    });
  });
  describe('third image', () => {
    let pic;
    before(() => {
      pic = pics[2].props;
    });
    it('has a sorce of small logo', () => {
      expect(pic.src).to.be.equal('Images/ARRLSmallLogo.png');
    });
    it('has a class of logo', () => {
      expect(pic.className).to.be.equal('logo');
    });
    it('it has an alt', () => {
      expect(pic.alt).to.be.equal('ARRL Logo');
    });
  });
});
