import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import Committees from './Committees';

// Tests: 89 passing 0 pending/failing
// handle change tests need to be rewritten - they are not testing what i am expecting
describe('MembershipForm commitee', () => {
  let commetteeForm;
  let commetteeOptions;
  let commiteeText;
  before(() => {
    commetteeForm = mount(
      <Provider store={store}>
        <rrd.MemoryRouter initialEntries={['/MembershipForm']}>
          <Committees />
        </rrd.MemoryRouter>
      </Provider>
    );
    commetteeOptions = commetteeForm
      .find('input')
      .map((node) => node.get(0).props);
      commiteeText = commetteeForm.find('div').map(node => node.get(0).props.children).reduce((arr, child) => {
        let str = child.filter(prop => typeof prop === 'string' && prop !== ' ')
        arr.push(...str)
        return arr
      }, [])
  });
  it('18 input fields', () => {
    expect(commetteeOptions).to.have.lengthOf(18);
  });
  it('message about commitee', () => {
    expect(commiteeText[0]).to.include('indicate areas')
  })
  describe('Checkbox - RAB', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[0];
    });
    it('name is Repeaters', () => {
      expect(inputField.name).to.be.equal('Repeaters');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Repeater Advisory Board', () => {
      expect(commiteeText[1]).to.be.equal('Repeater Advisory Board')
    })
  });
  describe('Checkbox - meeting programs', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[1];
    });
    it('name is meeting programs', () => {
      expect(inputField.name).to.be.equal('MeetingPrograms');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Meeting Programs', () => {
      expect(commiteeText[2]).to.be.equal('Meeting Programs')
    })
  });
  describe('Checkbox - Club Officer', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[2];
    });
    it('name is ClubOfficer', () => {
      expect(inputField.name).to.be.equal('ClubOfficer');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Club Officer', () => {
      expect(commiteeText[3]).to.be.equal('Club Officer')
    })
  });
  describe('Checkbox - Membership', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[3];
    });
    it('name is Membership', () => {
      expect(inputField.name).to.be.equal('MembershipCommittee');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Membership', () => {
      expect(commiteeText[4]).to.be.equal('Membership')
    })
  });
  describe('Checkbox - Public Service', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[4];
    });
    it('name is Public Service', () => {
      expect(inputField.name).to.be.equal('PublicService');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Public Service Event', () => {
      expect(commiteeText[5]).to.be.equal('Public Service Events')
    })
  });
  describe('Checkbox - Field Day', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[5];
    });
    it('name is FieldDay', () => {
      expect(inputField.name).to.be.equal('FieldDay');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Field Day (June)', () => {
      expect(commiteeText[6]).to.be.equal('Field Day (June)')
    })
  });
  describe('Checkbox - Fundraising', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[6];
    });
    it('name is Fundraising', () => {
      expect(inputField.name).to.be.equal('Fundraising');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Fundraising', () => {
      expect(commiteeText[7]).to.be.equal('Fundraising')
    })
  });
  describe('Checkbox - VE Testing', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[7];
    });
    it('name is VEtesting', () => {
      expect(inputField.name).to.be.equal('VEtesting');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has textVE Testing', () => {
      expect(commiteeText[8]).to.be.equal('VE Testing')
    })
  });
  describe('Checkbox - Training', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[8];
    });
    it('name is Training', () => {
      expect(inputField.name).to.be.equal('Training');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Training/Elmering', () => {
      expect(commiteeText[9]).to.be.equal('Training/Elmering')
    })
  });
  describe('Checkbox - Net', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[9];
    });
    it('name is Net', () => {
      expect(inputField.name).to.be.equal('Net');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text On-Air Networks', () => {
      expect(commiteeText[10]).to.be.equal('On-Air Networks')
    })
  });
  describe('Checkbox - csuTrailer', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[10];
    });
    it('name is csuTrailer', () => {
      expect(inputField.name).to.be.equal('csuTrailer');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text CSU Trailer', () => {
      expect(commiteeText[11]).to.be.equal('CSU Trailer')
    })
  });
  describe('Checkbox - Publicity', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[11];
    });
    it('name is Publicity', () => {
      expect(inputField.name).to.be.equal('Publicity');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Publicity', () => {
      expect(commiteeText[12]).to.be.equal('Publicity')
    })
  });
  describe('Checkbox - Hamfest', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[12];
    });
    it('name is Hamfest', () => {
      expect(inputField.name).to.be.equal('Hamfest');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Hamfest (January)', () => {
      expect(commiteeText[13]).to.be.equal('Hamfest (January)')
    })
  });
  describe('Checkbox - Youth Programs', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[13];
    });
    it('name is Youth Programs', () => {
      expect(inputField.name).to.be.equal('YouthPrograms');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Youth Programs', () => {
      expect(commiteeText[14]).to.be.equal('Youth Programs')
    })
  });
  describe('Checkbox - Hamletter', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[14];
    });
    it('name is Hamletter', () => {
      expect(inputField.name).to.be.equal('HamLetter');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text NewsLetter', () => {
      expect(commiteeText[15]).to.be.equal('Newsletter')
    })
  });
  describe('Checkbox - Website', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[15];
    });
    it('name is Website', () => {
      expect(inputField.name).to.be.equal('Website');
    });
    it('type is a checkbox', () => {
      expect(inputField.type).to.be.equal('checkbox');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.false;
    });
    it('has text Website', () => {
      expect(commiteeText[16]).to.be.equal('Website')
    })
  });
  describe('Checkbox - other', () => {
    let inputField;
    before(() => {
      inputField = commetteeOptions[17];
    });
    it('name is other', () => {
      expect(inputField.name).to.be.equal('other');
    });
    it('type is a text field', () => {
      expect(inputField.type).to.be.equal('text');
    });
    it('handles change', () => {
      expect(typeof inputField.onChange).to.equal('function');
    });
    it('has a default value of false', () => {
      expect(inputField.value).to.be.empty;
    });
    describe('check box next to it', () => {
      let box;
      before(() => {
        box = commetteeOptions[16];
      });
      it('has no name property', () => {
        expect(box.name).to.be.undefined;
      });
      it('type is a checkbox', () => {
        expect(box.type).to.be.equal('checkbox');
      });
      it('has text Other', () => {
        expect(commiteeText[17]).to.be.equal(' Other:')
      })
    });
  });
});
