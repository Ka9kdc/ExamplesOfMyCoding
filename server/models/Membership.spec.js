const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const {db, Member, Badge, Committee, Payment} = require('.');

describe.only('Basic Membership Tables set up', function(){

 


  describe('Basic Membership Fields', () => {
      //alpha no numbers or symbols

      // clear the database before all tests
      beforeEach(async() => {
        await db.sync({force: true});
      });
      
    let newMember = {
        FirstName: 'Hannah',
        LastName: "Green",
        Callsign: "Ka9ddd",
        Phone: 1234567890,
        Street: "123 happy lane",
        City: "st upidtown",
        State: "MA",
        Zip: 60606,
        Membership: "Full",
        Email: "abcde123@abc.com",
        DueYear: "2020",
        DATE: new Date
    }
    it("has a First name, last name and callsign fields", async () => {
      newMember.notARealAttribute = "does not compute";
      const testMember = await Member.create(newMember)
      expect(testMember.FirstName).to.equal('Hannah')
      expect(testMember.LastName).to.equal('Green')
      expect(testMember.Callsign).to.equal('Ka9ddd')
      expect(testMember.notARealAttribute).to.equal(undefined)
    })
    it("has a Phone, Street and  City fields", async () => {
      newMember.notARealAttribute = "does not compute";
      const testMember = await Member.create(newMember)
      expect(testMember.Phone).to.equal('1234567890')
      expect(testMember.Street).to.equal('123 happy lane')
      expect(testMember.City).to.equal('st upidtown')
      expect(testMember.notARealAttribute).to.equal(undefined)
    })
    it("has a State, Zip and  Membership fields", async () => {
      newMember.notARealAttribute = "does not compute";
      const testMember = await Member.create(newMember)
      expect(testMember.State).to.equal("MA")
      expect(testMember.Zip).to.equal(60606)
      expect(testMember.Membership).to.equal('Full')
      expect(testMember.notARealAttribute).to.equal(undefined)
    })
    it("has a Email, DueYear and  Date fields", async () => {
      newMember.notARealAttribute = "does not compute";
      const testMember = await Member.create(newMember)
      expect(testMember.Email).to.equal("abcde123@abc.com")
      expect(testMember.DueYear).to.equal(2020)
      expect(testMember.DATE).to.equal(new Date)
      expect(testMember.notARealAttribute).to.equal(undefined)
    })
    describe('FirstName', () => {
        let newMember2 = {
            LastName: "Green",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: '',
            LastName: "Green",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
      it('FirstName is a string', async () => {
        const hannah = await Member.create(newMember);
        expect(hannah.FirstName).to.equal('Hannah');
      });

      it('FirstName cannot be null', async () => {
        // We shouldn't be able to create a user without a name.
        const testMember = Member.build(newMember2)
        try {
          await testMember.validate()
          throw Error('validation should have failed without a first name');
        } catch (err) {
          expect(err.message).to.contain('FirstName cannot be null');
        }
      });

      it('FirstName cannot be an empty string', async () => {
        // We also shouldn't be able to create a user with an empty name.
        const testMember = Member.build(newMember3)
        try {
          await testMember.validate()
          throw Error('validation should have failed with empty FirstName');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on FirstName failed');
        }
      });
   
     it('FirstName cannot be null', async () => {
        // We shouldn't be able to create a user without a name.
        await expect(Member.create({})).to.be.rejected;
      });

      it('FirstName cannot be an empty string', async () => {
        // We also shouldn't be able to create a user with an empty name.
        await expect(Member.create({ FirstName: '' })).to.be.rejected;
      });
      
 });

    describe('LastName', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        it('LastName is a string', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.LastName).to.equal('Green');
        });
  
        it('LastName cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without a Last name');
            } catch (err) {
              expect(err.message).to.contain('LastName cannot be null');
            }
          });
    
          it('LastName cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            const testMember = Member.build(newMember3)
            try {
              await testMember.validate()
              throw Error('validation should have failed with empty LastName');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on LastName failed');
            }
          });

        it('LastName cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('LastName cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ LastName: '' })).to.be.rejected;
        });
      });

      //is it a vaild callsign?
      describe('Callsign', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        it('Callsign is a string', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.Callsign).to.equal('Ka9ddd');
        });
  
        it('Callsign cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without a callsign');
            } catch (err) {
              expect(err.message).to.contain('Callsign cannot be null');
            }
          });
    
          it('Callsign cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            const testMember = Member.build(newMember3)
            try {
              await testMember.validate()
              throw Error('validation should have failed with empty Callsign');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on Callsign failed');
            }
          });

        it('Callsign cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('Callsign cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ Callsign: '' })).to.be.rejected;
        });
      });

    // //   still need to figure out the tests for phone number
    //   describe('Phone', () => {
    //     it('Callsign is a string', async () => {
    //       const hannah = await Member.create({ Callsign: 'HANNAH' });
    //       expect(Member.Callsign).to.equal('HANNAH');
    //     });
  
    //     it('Callsign cannot be null', async () => {
    //       // We shouldn't be able to create a user without a name.
    //       await expect(Member.create({})).to.be.rejected;
    //     });
  
    //     it('Callsign cannot be an empty string', async () => {
    //       // We also shouldn't be able to create a user with an empty name.
    //       await expect(Member.create({ Callsign: '' })).to.be.rejected;
    //     });
    //   });      
    describe('Street', () => {
            let newMember2 = {
                FirstName: 'Hannah',
                LastName: 'Green',
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                Membership: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                DATE: new Date
            }
            
            let newMember3 = {
                FirstName: 'Hannah',
                LastName: "Green",
                Callsign: "Ka9ddd",
                Phone: 1234567890,
                Street: "",
                City: "st upidtown",
                State: "MA",
                Zip: 60606,
                Membership: "Full",
                Email: "abcde123@abc.com",
                DueYear: "2020",
                DATE: new Date
            }
            it('Street is a string', async () => {
            const hannah = await Member.create(newMember);
            expect(hannah.Street).to.equal('123 happy lane');
            });
            
            it('Street cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without a street');
            } catch (err) {
              expect(err.message).to.contain('Street cannot be null');
            }
            });

            it('Street cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            const testMember = Member.build(newMember3)
            try {
              await testMember.validate()
              throw Error('validation should have failed with empty Street');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on Street failed');
            }
            });
            it('Street cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            await expect(Member.create({})).to.be.rejected;
            });
    
            it('Street cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            await expect(Member.create({ Street: '' })).to.be.rejected;
            });
        });

    describe('City', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            LastName: 'Green',
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        it('City is a string', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.City).to.equal('st upidtown');
        });
        
        it('City cannot be null', async () => {
        // We shouldn't be able to create a user without a name.
        const testMember = Member.build(newMember2)
        try {
          await testMember.validate()
          throw Error('validation should have failed without a city');
        } catch (err) {
          expect(err.message).to.contain('City cannot be null');
        }
        });

        it('City cannot be an empty string', async () => {
        // We also shouldn't be able to create a user with an empty name.
        const testMember = Member.build(newMember3)
        try {
          await testMember.validate()
          throw Error('validation should have failed with empty City');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on City failed');
        }
        });
        it('City cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('City cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ City: '' })).to.be.rejected;
        });
      });
 

      describe('State', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9kddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "",
            Zip: 60606,
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        it('State is a string', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.State).to.equal('MA');
        });
  
        it('State cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without a state');
            } catch (err) {
              expect(err.message).to.contain('State cannot be null');
            }
          });
    
          it('State cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            const testMember = Member.build(newMember3)
            try {
              await testMember.validate()
              throw Error('validation should have failed with empty State');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on State failed');
            }
          });

        it('State cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('State cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ State: '' })).to.be.rejected;
        });
      });

      //empty string? 5 numbers
        describe('Zip', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9kdd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: '',
            Membership: "Full",
            Email: "abcde123@abc.com",
            DueYear: "2020",
            DATE: new Date
        }
        it('Zip is a Interger', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.Zip).to.equal(60606);
        });
  
        it('Zip cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without zip');
            } catch (err) {
              expect(err.message).to.contain('Zip cannot be null');
            }
          });
    
          it('Zip cannot be an empty string', async () => {
            // We also shouldn't be able to create a user with an empty name.
            const testMember = Member.build(newMember3)
            try {
              await testMember.validate()
              throw Error('validation should have failed with empty Zip');
            } catch (err) {
              expect(err.message).to.contain('Validation notEmpty on Zip failed');
            }
          });

        it('Zip cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('Zip cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ Zip: '' })).to.be.rejected;
        });
      });

    //   describe('Membership Type', () => {
    //     it('Callsign is a string', async () => {
    //       const hannah = await Member.create({ Callsign: 'HANNAH' });
    //       expect(Member.Callsign).to.equal('HANNAH');
    //     });
  
    //     it('Callsign cannot be null', async () => {
    //       // We shouldn't be able to create a user without a name.
    //       await expect(Member.create({})).to.be.rejected;
    //     });
  
    //     it('Callsign cannot be an empty string', async () => {
    //       // We also shouldn't be able to create a user with an empty name.
    //       await expect(Member.create({ Callsign: '' })).to.be.rejected;
    //     });
    //   });

    describe('Email', () => {
        let newMember2 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9ddd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            DueYear: "2020",
            DATE: new Date
        }
        
        let newMember3 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9kdd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "",
            DueYear: "2020",
            DATE: new Date
        }

        let newMember4 = {
            FirstName: 'Hannah',
            LastName: "Green",
            Callsign: "Ka9kdd",
            Phone: 1234567890,
            Street: "123 happy lane",
            City: "st upidtown",
            State: "MA",
            Zip: 60606,
            Membership: "Full",
            Email: "asdfasdf",
            DueYear: "2020",
            DATE: new Date
        }

        it('Email is a string', async () => {
          const hannah = await Member.create(newMember);
          expect(hannah.Email).to.equal('abcde123@abc.com');
        });
  
        it('Email cannot be null', async () => {
            // We shouldn't be able to create a user without a name.
            const testMember = Member.build(newMember2)
            try {
              await testMember.validate()
              throw Error('validation should have failed without a email');
            } catch (err) {
              expect(err.message).to.contain('Email cannot be null');
            }
          });
    
        it('Email cannot be an empty string', async () => {
        // We also shouldn't be able to create a user with an empty name.
        const testMember = Member.build(newMember3)
        try {
          await testMember.validate()
          throw Error('validation should have failed with empty Email');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on Email failed');
        }
        });

        it('Email cannot be null', async () => {
          // We shouldn't be able to create a user without a name.
          await expect(Member.create({})).to.be.rejected;
        });
  
        it('Email cannot be an empty string', async () => {
          // We also shouldn't be able to create a user with an empty name.
          await expect(Member.create({ Email: '' })).to.be.rejected;
        });

        it("Email must be a email address", async () =>{
            await expect(Member.create(newMember4)).to.be.rejected;
        })
      });

    //   describe('Due Year ', () => {
    //     it('Callsign is a string', async () => {
    //       const hannah = await Member.create({ Callsign: 'HANNAH' });
    //       expect(Member.Callsign).to.equal('HANNAH');
    //     });
  
    //     it('Callsign cannot be null', async () => {
    //       // We shouldn't be able to create a user without a name.
    //       await expect(Member.create({})).to.be.rejected;
    //     });
  
    //     it('Callsign cannot be an empty string', async () => {
    //       // We also shouldn't be able to create a user with an empty name.
    //       await expect(Member.create({ Callsign: '' })).to.be.rejected;
    //     });
    //   });
    });
})