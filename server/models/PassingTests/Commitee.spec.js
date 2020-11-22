const {expect} = require('chai')
const { db, Committee } = require('..')

//Tests: 36 passing, 0 pending and 0 failing
describe('Committee', () => {
    before(() => db.sync({force: true}))
    describe('Hamfest', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Hamfest: true});
          expect(hannah.Hamfest).to.equal(true);
          expect(typeof hannah.Hamfest).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Hamfest: false});
          expect(hannah.Hamfest).to.equal(false);
        });
      });
      describe('FieldDay', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({FieldDay: true});
          expect(hannah.FieldDay).to.equal(true);
          expect(typeof hannah.FieldDay).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({FieldDay: false});
          expect(hannah.FieldDay).to.equal(false);
        });
      });
      describe('PublicService', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({PublicService: true});
          expect(hannah.PublicService).to.equal(true);
          expect(typeof hannah.PublicService).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({PublicService: false});
          expect(hannah.PublicService).to.equal(false);
        });
      });
      describe('MembershipCommittee', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({MembershipCommittee: true});
          expect(hannah.MembershipCommittee).to.equal(true);
          expect(typeof hannah.MembershipCommittee).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({MembershipCommittee: false});
          expect(hannah.MembershipCommittee).to.equal(false);
        });
      });
      describe('Publicity', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Publicity: true});
          expect(hannah.Publicity).to.equal(true);
          expect(typeof hannah.Publicity).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Publicity: false});
          expect(hannah.Publicity).to.equal(false);
        });
      });
      describe('Fundraising', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Fundraising: true});
          expect(hannah.Fundraising).to.equal(true);
          expect(typeof hannah.Fundraising).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Fundraising: false});
          expect(hannah.Fundraising).to.equal(false);
        });
      });
      describe('MeetingPrograms', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({MeetingPrograms: true});
          expect(hannah.MeetingPrograms).to.equal(true);
          expect(typeof hannah.MeetingPrograms).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({MeetingPrograms: false});
          expect(hannah.MeetingPrograms).to.equal(false);
        });
      });
      describe('ClubOfficer', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({ClubOfficer: true});
          expect(hannah.ClubOfficer).to.equal(true);
          expect(typeof hannah.ClubOfficer).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({ClubOfficer: false});
          expect(hannah.ClubOfficer).to.equal(false);
        });
      });
      describe('HamLetter', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({HamLetter: true});
          expect(hannah.HamLetter).to.equal(true);
          expect(typeof hannah.HamLetter).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({HamLetter: false});
          expect(hannah.HamLetter).to.equal(false);
        });
      });
      describe('Website', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Website: true});
          expect(hannah.Website).to.equal(true);
          expect(typeof hannah.Website).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Website: false});
          expect(hannah.Website).to.equal(false);
        });
      });
      describe('csuTrailer', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({csuTrailer: true});
          expect(hannah.csuTrailer).to.equal(true);
          expect(typeof hannah.csuTrailer).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({csuTrailer: false});
          expect(hannah.csuTrailer).to.equal(false);
        });
      });
      describe('Repeaters', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Repeaters: true});
          expect(hannah.Repeaters).to.equal(true);
          expect(typeof hannah.Repeaters).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Repeaters: false});
          expect(hannah.Repeaters).to.equal(false);
        });
      });
      describe('Net', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Net: true});
          expect(hannah.Net).to.equal(true);
          expect(typeof hannah.Net).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Net: false});
          expect(hannah.Net).to.equal(false);
        });
      });
      describe('Training', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({Training: true});
          expect(hannah.Training).to.equal(true);
          expect(typeof hannah.Training).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({Training: false});
          expect(hannah.Training).to.equal(false);
        });
      });
      describe('VEtesting', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({VEtesting: true});
          expect(hannah.VEtesting).to.equal(true);
          expect(typeof hannah.VEtesting).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({VEtesting: false});
          expect(hannah.VEtesting).to.equal(false);
        });
      });
      describe('YouthPrograms', () => {
        it(' is a boolean', async () => {
          const hannah = await Committee.create({YouthPrograms: true});
          expect(hannah.YouthPrograms).to.equal(true);
          expect(typeof hannah.YouthPrograms).to.equal('boolean');
        });
        it('can be false', async () => {
          const hannah = await Committee.create({YouthPrograms: false});
          expect(hannah.YouthPrograms).to.equal(false);
        });
      });
      describe('other field', () => {
        it('other is a string', async () => {
          const hannah = await Committee.create({other: 'Hannah'});
          expect(hannah.other).to.equal('Hannah');
          expect(typeof hannah.other).to.equal('string');
        });
        
        it('other cannot be an empty string', async () => {
          // We also shouldn't be able to create a Committee with an empty name.
          const testCommittee = Committee.build({other: ''});
          try {
            await testCommittee.validate();
            throw Error('validation should have failed with empty other');
          } catch (err) {
            expect(err.message).to.contain(
              'Validation notEmpty on other failed'
            );
          }
        });
        it('other cannot have numbers', async () => {
          // We also shouldn't be able to create a Committee with an empty name.
          const testCommittee = Committee.build({other: 'abc123'});
          try {
            await testCommittee.validate();
            throw Error('validation should have failed with numbers in other');
          } catch (err) {
            expect(err.message).to.contain(
              'Validation isAlpha on other failed'
            );
          }
        });
        it('other cannot have symbols', async () => {
          // We also shouldn't be able to create a Committee with an empty name.
          const testCommittee = Committee.build({other:'abc;jhg' });
          try {
            await testCommittee.validate();
            throw Error('validation should have failed with symbols in other');
          } catch (err) {
            expect(err.message).to.contain(
              'Validation isAlpha on other failed'
            );
          }
        });
      });
    })