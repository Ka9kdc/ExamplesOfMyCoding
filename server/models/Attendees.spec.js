const {expect} = require('chai')
const db = require('./db')
const {Attendee} = require('./Attendees')


//Still missing phone number, tests
describe('Attendee Model', () => {
    
    before(() => db.sync({force:true}))
    
    let newAttendee
    beforeEach(() => {
        newAttendee = {
            Name: 'Hannah',
            Callsign: "Ka9ddd",
            Phone: '1234567890',
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Email: "abcde123@abc.com",
            OrderDate: new Date
        }
    })

    afterEach(() => db.sync({force:true}))
  describe('fields', () => {
    let testAttendee
    beforeEach(async () => {
        newAttendee.notARealAttribute = "does not compute";
        testAttendee = await Attendee.create(newAttendee)
    })

    it("has a Name, and callsign fields", () => {
        expect(testAttendee.Name).to.equal('Hannah')
        expect(testAttendee.Callsign).to.equal('Ka9ddd')
        expect(testAttendee.notARealAttribute).to.equal(undefined)
      })
      it("has a Phone, Street and  City fields", () => {
        expect(testAttendee.Phone).to.equal('1234567890')
        expect(testAttendee.Street).to.equal('123 happy lane')
        expect(testAttendee.City).to.equal('st upidtown')
        expect(testAttendee.notARealAttribute).to.equal(undefined)
      })
      it("has a State, Zip and  SpecialRequests fields", () => {
        expect(testAttendee.State).to.equal("MA")
        expect(testAttendee.Zip).to.equal(60606)
        expect(testAttendee.notARealAttribute).to.equal(undefined)
      })
      it("has a Email, and  Date fields", async () => {
        expect(testAttendee.Email).to.equal("abcde123@abc.com")
        expect(testAttendee.OrderDate).to.be.exist
        expect(testAttendee.notARealAttribute).to.equal(undefined)
      })
    })
    describe('Name field', () => {
        it('Name is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Name).to.equal('Hannah');
          });    
        it('Name cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({
                Company: "Green",
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "123 happy lane",
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
              await testAttendee.validate()
              throw Error('validation should have failed without a first name');
            } catch (err) {
              expect(err.message).to.contain('Name cannot be null');
            }
        });
        it('Name cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.Name = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
                await testAttendee.validate()
                throw Error('validation should have failed with empty Name');
            } catch (err) {
                expect(err.message).to.contain('Validation notEmpty on Name failed');
            }
        });
    })
    describe.skip('Company', () => {
        it('Company is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Company).to.equal('Green');
        });
        xit('Company cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({ 
                Name: 'Hannah',
                Callsign: "Ka9ddd",
                Phone: '1234567890',
                Street: "123 happy lane",
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
              await testAttendee.validate()
              throw Error('validation should have failed without a Last name');
            } catch (err) {
              expect(err.message).to.contain('Company cannot be null');
            }
        });
        xit('Company cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
           newAttendee.Company = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
              await testAttendee.validate()
              throw Error('validation should have failed with empty Company');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on Company failed');
            }
        });
    })
    describe('callsign', () => {
          //is it a vaild callsign?
        it('Callsign is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Callsign).to.equal('Ka9ddd');
          });
    
        xit('Callsign cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({ 
                Name: 'Hannah',
                Company: "Green",
                Phone: 1234567890,
                Street: "123 happy lane",
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
            await testAttendee.validate()
            throw Error('validation should have failed without a callsign');
            } catch (err) {
            expect(err.message).to.contain('Callsign cannot be null');
            }
        });
    
        xit('Callsign cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.Callsign = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
            await testAttendee.validate()
            throw Error('validation should have failed with empty Callsign');
            } catch (err) {
            expect(err.message).to.contain('Validation notEmpty on Callsign failed');
            }
        });
    })
    describe('Street', () => {
        it('Street is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Street).to.equal('123 happy lane');
        });
        xit('Street cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({
                Name: 'Hannah',
                Company: 'Green',
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
              await testAttendee.validate()
              throw Error('validation should have failed without a street');
            } catch (err) {
              expect(err.message).to.contain('Street cannot be null');
            }
        });

        xit('Street cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.Street = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
              await testAttendee.validate()
              throw Error('validation should have failed with empty Street');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on Street failed');
            }
        });
    })
    describe('city', () => {
        it('City is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.City).to.equal('st upidtown');
        });
        xit('City cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({
                Name: 'Hannah',
                Company: 'Green',
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "123 happy lane",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
              await testAttendee.validate()
              throw Error('validation should have failed without a city');
            } catch (err) {
              expect(err.message).to.contain('City cannot be null');
            }
        });
    
        xit('City cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.City = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
              await testAttendee.validate()
              throw Error('validation should have failed with empty City');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on City failed');
            }
        });
    })
    describe('State', () => {
        it('State is a string', async () => {
          const hannah = await Attendee.create(newAttendee);
          expect(hannah.State).to.equal('MA');
        });
  
        xit('State cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({
                Name: 'Hannah',
                Company: "Green",
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "123 happy lane",
                City: "st upidtown",
                Zip: 60606,
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
              await testAttendee.validate()
              throw Error('validation should have failed without a state');
            } catch (err) {
              expect(err.message).to.contain('State cannot be null');
            }
        });
    
        xit('State cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.State = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
              await testAttendee.validate()
              throw Error('validation should have failed with empty State');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on State failed');
            }
        });
    })
    describe('Zip', () => {
        it('Zip is a Interger', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Zip).to.equal(60606);
          });
    
        xit('Zip cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testAttendee = Attendee.build({
                Name: 'Hannah',
                Company: "Green",
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "123 happy lane",
                City: "st upidtown",
                State: "MA",
                SpecialRequests: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                OrderDate: new Date
            })
            try {
            await testAttendee.validate()
            throw Error('validation should have failed without zip');
            } catch (err) {
            expect(err.message).to.contain('Zip cannot be null');
            }
        });
      
        xit('Zip cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            newAttendee.Zip = ''
            const testAttendee = Attendee.build(newAttendee)
            try {
            await testAttendee.validate()
            throw Error('validation should have failed with empty Zip');
            } catch (err) {
            expect(err.message).to.contain('Validation notEmpty on Zip failed');
            }
        });
    })
    describe('Email', () => {
        it('Email is a string', async () => {
            const hannah = await Attendee.create(newAttendee);
            expect(hannah.Email).to.equal('abcde123@abc.com');
        });
        xit('Email cannot be null', async () => {
              // We shouldn't be able to create a user without a name.
              const testAttendee = Attendee.build({
                Name: 'Hannah',
                Company: "Green",
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "123 happy lane",
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                SpecialRequests: "Full",
                DueYear: "2020",
                OrderDate: new Date
              })
              try {
                await testAttendee.validate()
                throw Error('validation should have failed without a email');
              } catch (err) {
                expect(err.message).to.contain('Email cannot be null');
              }
         });
      
        xit('Email cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          newAttendee.Email = ''
          const testAttendee = Attendee.build(newAttendee)
          try {
            await testAttendee.validate()
            throw Error('validation should have failed with empty Email');
          } catch (err) {
            expect(err.message).to.contain('Validation notEmpty on Email failed');
          }
        });
        it('Email must be an email address', async () => {
            newAttendee.Email = 'Hello'
            const testAttendee = Attendee.build(newAttendee)
            try {
              await testAttendee.validate()
              throw Error('validation should have failed with a non Email');
            } catch (err) {
              expect(err.message).to.contain('Validation isEmail on Email failed');
            }

        })
    })
})