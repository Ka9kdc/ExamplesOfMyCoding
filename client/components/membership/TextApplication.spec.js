import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TextApplication from './TextApplication';

//Tests: 24 passing 0 pending/failing
describe('Text Application', () => {
  let application;
  let pageText;
  let checkText;
  before(() => {
    application = shallow(<TextApplication />);
    pageText = application
      .find('div')
      .map((node) => node.get(0).props.children);
    let td = application.find('td').map((node) => node.get(0).props.children);
    checkText = td.reduce((arr, child) => {
      let str = child.filter((props) => typeof props === 'string');
      arr.push(...str);
      return arr;
    }, []);
  });
  it('has the club name at the top', () => {
    expect(pageText).to.includes('Wheaton Community Radio Amateurs');
  });
  it('has the address', () => {
    expect(pageText).to.includes(
      'P.O. Box 1055 • Wheaton, IL 60187-1055 • (630) 923-5447'
    );
  });
  describe('membershiptypes', () => {
    it('has Full Membership $26', () => {
      expect(checkText).to.includes(' Full Membership $26');
    });
    it('has Student/Sr Citizen $13', () => {
      expect(checkText).to.includes(' Student/Sr Citizen $13');
    });
    it('has Lifetime Member $0', () => {
      expect(checkText).to.includes(' Lifetime Member $0');
    });
    it('has Membership - Associate (no license) $13', () => {
      expect(checkText).to.includes(' Associate (no license) $13');
    });
  });
  describe('badge', () => {
    it('has variouscolors', () => {
      expect(checkText).to.includes(' red, white & blue');
      expect(checkText).to.includes(' red');
      expect(checkText).to.includes(' blue');
      expect(checkText).to.includes(' white');
      expect(checkText).to.includes(' black');
      expect(checkText).to.includes(' green');
      expect(checkText).to.includes(' brown');
      expect(checkText).to.includes(' brown');
    });
  });
  describe('commetties listed', () => {
    it('has ClubOfficer', () => {
      expect(checkText).to.includes(' Club Officer');
    });
    it('has Repeater Advisory Board', () => {
      expect(checkText).to.includes(' Repeater Advisory Board');
    });
    it('has Meeting Programs', () => {
      expect(checkText).to.includes(' Meeting Programs');
    });
    it('has Membership', () => {
      expect(checkText).to.includes(' Membership');
    });
    it('has Public Service Events', () => {
      expect(checkText).to.includes(' Public Service Events');
    });
    it('has Field Day (June)', () => {
      expect(checkText).to.includes(' Field Day (June)');
    });
    it('has Fundraising', () => {
      expect(checkText).to.includes(' Fundraising');
    });
    it('has VE Testing', () => {
      expect(checkText).to.includes(' VE Testing');
    });
    it('has Training/Elmering', () => {
      expect(checkText).to.includes(' Training/Elmering');
    });
    it('has On-Air Networks', () => {
      expect(checkText).to.includes(' On-Air Networks');
    });
    it('has CSU Trailer', () => {
      expect(checkText).to.includes(' CSU Trailer');
    });
    it('has Publicity', () => {
      expect(checkText).to.includes(' Publicity');
    });
    it('has Hamfest', () => {
      expect(checkText).to.includes(' Hamfest (January)');
    });
    it('has Youth Programs', () => {
      expect(checkText).to.includes(' Youth Programs');
    });
    it('has NewsLetter', () => {
      expect(checkText).to.includes(' Newsletter');
    });
    it('has Web site', () => {
      expect(checkText).to.includes(' Web site');
    });
    it('has Other:', () => {
      expect(checkText).to.includes(' Other: ____________________________');
    });
  });
});
