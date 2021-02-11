import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AboutUs from './AboutUs';
import AddressBlock from './addressblock';

//Tests: 64 passing 0pending/failing
describe('About Us', () => {
  let aboutUsPage;
  let aboutUsDivs;
  before(() => {
    aboutUsPage = shallow(<AboutUs />);
    aboutUsDivs = aboutUsPage.find('div').map((node) => node.get(0).props);
  });
  const findStr = (propArr) => {
    let result = propArr.reduce((arr, child) => {
      if (child.type !== 'h1' && child.type !== 'h2') {
        if (child.props) {
          let children = child.props.children;
          if (Array.isArray(children)) {
            let newArr = findStr(children);
            arr.push(...newArr);
          } else {
            arr.push(children);
          }
        } else {
          arr.push(child);
        }
      }
      return arr;
    }, []);
    return result;
  };
  it('renders the club address block', () => {
    expect(aboutUsPage.find(AddressBlock)).to.have.lengthOf(1);
  });
  it('has two divs', () => {
    expect(aboutUsDivs).to.have.lengthOf(2);
  });
  it('has a title of About WCRA', () => {
    expect(aboutUsDivs[0].className).to.be.equal('Title');
    expect(aboutUsDivs[0].children).to.be.equal('About WCRA');
  });
  it('The other div holds the content', () => {
    expect(aboutUsDivs[1].className).to.be.equal('Content');
    expect(aboutUsDivs[1].children).to.have.lengthOf.greaterThan(1);
  });
  it('the content is divede in to 3 sections', () => {
    expect(aboutUsDivs[1].children).to.have.lengthOf(3);
  });
  describe('the first section is for the purpose', () => {
    let header;
    let purposeText;
    before(() => {
      let thisSection = aboutUsDivs[1].children[0].props.children;
      header = thisSection[0];
      purposeText = thisSection.reduce((arr, child) => {
        if (child.type !== 'h1') {
          let children = child.props.children;
          if (Array.isArray(children)) {
            let newArr = findStr(children);
            arr.push(...newArr);
          } else {
            arr.push(children);
          }
        }
        return arr;
      }, []);
    });
    it('has an h1 title of Purpose', () => {
      expect(header.type).to.be.equal('h1');
      expect(header.props.children).to.be.equal('Purpose');
    });
    it('to further interest', () => {
      expect(purposeText).to.include(
        'To further the interests of Amateur Radio through active participation therein.'
      );
    });
    it('to improve proficient', () => {
      expect(purposeText).to.include('To improve radio proficiency');
    });
    it('to develop relations', () => {
      expect(purposeText).to.include('To develop better public relations');
    });
    it('prepare for emergencies', () => {
      expect(purposeText).to.include(
        'To prepare for any communications emergencies.'
      );
    });
    it('aid in training, and development', () => {
      expect(purposeText).to.include(
        'To aid in the training and development of future Radio Amateurs.'
      );
    });
    it('is not a repeater club', () => {
      expect(purposeText).to.include(
        'Based on the above, WCRA should not be considered a "repeater club;" however, WCRA currently maintains'
      );
    });
  });
  describe('the first section is for the activites', () => {
    let header;

    let subSection;
    before(() => {
      let thisSection = aboutUsDivs[1].children[1].props.children;
      header = thisSection[0];
      subSection = thisSection.map((child) => child.props.children);
    });
    it('has an h1 title of activities', () => {
      expect(header.type).to.be.equal('h1');
      expect(header.props.children).to.be.equal('Activities');
    });
    describe('it has a subsection about meetings', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[1]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[1].reduce((arr, child) => {
          if (child.type !== 'h1' && child.type !== 'h2') {
            let children = child.props.children;
            if (Array.isArray(children)) {
              let newArr = findStr(children);
              arr.push(...newArr);
            } else {
              arr.push(children);
            }
          }
          return arr;
        }, []);
      });
      it('has a header of meeting', () => {
        expect(subHeader[0]).to.equal('Meetings');
      });
      it('talks about where the meeting is held', () => {
        expect(purposeText[0]).to.include(
          'First Presbyterian Church of Wheaton, 715 N Carlton St, Wheaton, IL.'
        );
      });
      it('talks about when the meeting is', () => {
        expect(purposeText[0]).to.include(
          'first Friday of the month at 7:30 PM '
        );
      });
    });
    describe('it has a subsection about FieldDay', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[2]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[2]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of meeting', () => {
        expect(subHeader[0]).to.equal('ARRL Field Day');
      });
      it('talks about what field day is', () => {
        expect(purposeText).to.include(
          'Gasoline generators are typically used for electrical power for the weekend event'
        );
      });
      it('talks about when the ARRL Field Day is', () => {
        expect(purposeText).to.include('event held in late June.');
      });
      it('talks about what the club does for field day', () => {
        expect(purposeText).to.include(
          'Club members may put a station on the air for the event'
        );
      });
      it('says visiters are welcome', () => {
        expect(purposeText).to.include(
          'Visitors and persons interested in Amateur Radio are invited'
        );
      });
    });
    describe('it has a subsection about Amateur Radio License Classes', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[3]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[3]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Amateur Radio License Classes', () => {
        expect(subHeader[0]).to.equal('Amateur Radio License Classes');
      });
      it('says the club teaches classes', () => {
        expect(purposeText).to.include('WCRA conducts classes');
      });
      it('talks about the why', () => {
        expect(purposeText).to.include(' obtaining an amateur radio license');
      });
    });
    describe('it has a subsection about Volunteer Examiner Exams', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[4]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[4]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of  Volunteer Examiner Exams', () => {
        expect(subHeader[0]).to.equal('Volunteer Examiner Exams');
      });
      it('says the cluboffers test', () => {
        expect(purposeText).to.include(
          'Examinations for amateur radio licenses are given'
        );
      });
      it('talks about when ', () => {
        expect(purposeText).to.include('throughout the year');
      });
      it('exams givin by club members', () => {
        expect(purposeText).to.include('by WCRA Volunteer Examiners');
      });
    });
    describe('it has a subsection about Public Service Events', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[5]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[5]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Public Service Events', () => {
        expect(subHeader[0]).to.equal('Public Service Events');
      });
      it('says the club active in public service', () => {
        expect(purposeText).to.include(
          'WCRA club members provide communication support'
        );
      });
      it('talks about where', () => {
        expect(purposeText).to.include(
          'to a number of area public service events'
        );
      });
      it('gives examples', () => {
        expect(purposeText).to.include(
          'walkathons, bikeathons, various parades'
        );
      });
    });
    describe('it has a subsection about Emergency Services Support', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[6]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[6]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Emergency Services Support', () => {
        expect(subHeader[0]).to.equal('Emergency Services Support');
      });
      it('says the club active in emergeincy', () => {
        expect(purposeText).to.include('WCRA club members are active');
      });
      it('talks about where', () => {
        expect(purposeText).to.include('in local and area wide amateur radio');
      });
    });
    describe('it has a subsection about Social', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[7]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[7]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Social Events', () => {
        expect(subHeader[0]).to.equal('Social Events');
      });
      it('says the club active in social things', () => {
        expect(purposeText).to.include('Several of our members get together');
      });
      it('talks about where', () => {
        expect(purposeText).to.include(' for gathering information.');
      });
    });
    describe('it has a subsection about Hamfest', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[8]
          .filter((div) => div.type === 'h2')
          .map((div) => div.props.children);
        purposeText = subSection[8]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Hamfest', () => {
        expect(subHeader[0]).to.equal('Hamfest');
      });
      it('says the club hosts a hamfest', () => {
        expect(purposeText).to.include('WCRA hosts a Hamfest');
      });
      it('talks about when', () => {
        expect(purposeText).to.include('every January');
      });
      it('talks about what', () => {
        expect(purposeText).to.include(
          ' a ham radio, computer and hobby electronics flea market'
        );
      });
      it('says visiters are welcome', () => {
        expect(purposeText).to.include(
          'Visitors and persons interested in Amateur Radio are invited'
        );
      });
    });
    describe('it has a subsection about Membership', () => {
      let subHeader;
      let purposeText;
      before(() => {
        subHeader = subSection[9]
          .filter((div) => div.type === 'h2' || div.type === 'h1')
          .map((div) => div.props.children);
        purposeText = subSection[9]
          .reduce((arr, child) => {
            if (child.type !== 'h1' && child.type !== 'h2') {
              let children = child.props.children;
              if (Array.isArray(children)) {
                let newArr = findStr(children);
                arr.push(...newArr);
              } else {
                arr.push(children);
              }
            }
            return arr;
          }, [])
          .join('');
      });
      it('has a header of Membership', () => {
        expect(subHeader[0]).to.equal('Membership');
      });
      it('has a subheader of Dues', () => {
        expect(subHeader[1]).to.equal('Dues');
      });
      it('talks about full membership', () => {
        expect(purposeText).to.include('Full WCRA membership');
        expect(purposeText).to.include('open to all licensed radio amateurs');
      });
      it('talks about Associate memberhship', () => {
        expect(purposeText).to.include('Associate membership');
        expect(purposeText).to.include(
          'interested in supporting and promoting'
        );
      });
      it('talks about how to join', () => {
        expect(purposeText).to.include('To join WCRA club as a new member');
      });
      it('discusses dues', () => {
        expect(purposeText).to.include('Annual dues');
      });
      it('discusses due pricing', () => {
        expect(purposeText).to.include('membership is $26.00');
        expect(purposeText).to.include('$39.00 annually');
        expect(purposeText).to.include('$13.00 per year');
      });
      it('discusses when dues are due', () => {
        expect(purposeText).to.include('the beginning of each calendar year');
      });
    });
  });
  describe("the first section is for the the Club's Makeup", () => {
    let header;
    let purposeText;
    before(() => {
      let thisSection = aboutUsDivs[1].children[2].props.children;
      header = thisSection[0];
      purposeText = thisSection
        .reduce((arr, child) => {
          if (child.type !== 'h1') {
            let children = child.props.children;
            if (Array.isArray(children)) {
              let newArr = findStr(children);
              arr.push(...newArr);
            } else {
              arr.push(children);
            }
          }
          return arr;
        }, [])
        .join('');
    });
    it("has an h1 title of About the Club's Makeup", () => {
      expect(header.type).to.be.equal('h1');
      expect(header.props.children).to.be.equal("About the Club's Makeup");
    });
    it('full name', () => {
      expect(purposeText).to.include('Wheaton Community Radio Amateurs');
    });
    it('a a not-for-profit corporation', () => {
      expect(purposeText).to.include('a not-for-profit corporation');
    });
    it('its founding in 1948', () => {
      expect(purposeText).to.include('its founding in 1948');
    });
    it('There are five club officers', () => {
      expect(purposeText).to.include('There are five club officers');
    });
    it('current Articles of Incorporation', () => {
      expect(purposeText).to.include('current Articles of Incorporation');
    });
    it('classificcation', () => {
      expect(purposeText).to.include(
        'a hobby club as defined in section 501(c)7 of the Internal Revenue Code'
      );
    });
  });
  describe('links', () => {
    let pageLinks;
    before(() => {
      pageLinks = aboutUsPage.find('Link').map((node) => node.get(0).props);
    });
    it('has a link to the contactUs page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/ContactUs');
      expect(linkFound).to.have.lengthOf.greaterThan(1);
    });
    it('has a link to the repeaters page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/Repeaters');
      expect(linkFound).to.have.lengthOf.greaterThan(1);
    });
    it('has a link to the Training page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/Training');
      expect(linkFound).to.have.lengthOf.greaterThan(0);
    });
    it('has a link to the Events page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/Events');
      expect(linkFound).to.have.lengthOf.greaterThan(0);
    });
    it('has a link to the Hamfest page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/Hamfest');
      expect(linkFound).to.have.lengthOf.greaterThan(0);
    });
    it('has a link to the bylaws  page', () => {
      let linkFound = pageLinks.filter((link) => link.to === '/Bylaws');
      expect(linkFound).to.have.lengthOf.greaterThan(0);
    });
  });
});
