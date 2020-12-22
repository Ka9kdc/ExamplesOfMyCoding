const { expect, assert } = require('chai');
const { db, CalendarEvent } = require('..');

//Tests: 24 passing 0 pending/failing
describe('CalendarEvent model', () => {
  let newCalendarEvent;
  beforeEach(async () => {
    await db.sync({ force: true });
    newCalendarEvent = {
      Name: 'Club Meeting',
      Start: new Date(),
      End: new Date(),
      Location: 'Zoom',
      Description: 'asfd asdf adsf asdf asdf',
      Type: 'Training Class',
    };
  });
  describe('Name field', () => {
    it('Name is a string', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Name).to.equal('Club Meeting');
      expect(typeof hannah.Name).to.equal('string');
    });
    it('Name cannot be null', async () => {
      // We shouldn't be able to create a CalendarEvent without a name.
      const testCalendarEvent = CalendarEvent.build({
        Start: new Date(),
        End: new Date(),
        Location: 'Zoom',
        Description: 'asfd asdf adsf asdf asdf',
        Type: 'Training Class',
      });
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Name cannot be null');
      }
    });
    it('Name cannot be an empty string', async () => {
      // We also shouldn't be able to create a CalendarEvent with an empty name.
      newCalendarEvent.Name = '';
      const testCalendarEvent = CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with empty Name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Name failed');
      }
    });
  });
  describe('Location', () => {
    it('Location is a string', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Location).to.equal('Zoom');
      expect(typeof hannah.Location).to.equal('string');
    });
    it('Location cannot be null', async () => {
      // We shouldn't be able to create a CalendarEvent without a name.
      const testCalendarEvent = CalendarEvent.build({
        Name: 'Club Meeting',
        Start: new Date(),
        End: new Date(),
        Description: 'asfd asdf adsf asdf asdf',
        Type: 'Training Class',
      });
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed without a location');
      } catch (err) {
        expect(err.message).to.contain('Location cannot be null');
      }
    });
    it('Location cannot be an empty string', async () => {
      // We also shouldn't be able to create a CalendarEvent with an empty name.
      newCalendarEvent.Location = '';
      const testCalendarEvent = CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with empty Location');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Location failed'
        );
      }
    });
  });
  describe('Type', () => {
    it('Type is a string', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      expect(typeof hannah.Type).to.equal('string');
    });
    it('can take Training Class and Club Meeting', async () => {
      let hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Training Class');
      newCalendarEvent.Type = 'Club Meeting';
      hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Club Meeting');
    });
    it('can take Net and Special Event', async () => {
      newCalendarEvent.Type = 'Net';
      let hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Net');
      newCalendarEvent.Type = 'Special Event';
      hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Special Event');
    });
    it('can take Public Service Event and Testing', async () => {
      newCalendarEvent.Type = 'Public Service Event';
      let hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Public Service Event');
      newCalendarEvent.Type = 'Testing';
      hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Testing');
    });
    it('can take CSU and Other', async () => {
      newCalendarEvent.Type = 'CSU';
      let hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('CSU');
      newCalendarEvent.Type = 'Other';
      hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Type).to.equal('Other');
    });
    it('Type defaults to other when null is passed in', async () => {
      const testCalendarEvent = await CalendarEvent.create({
        Name: 'Club Meeting',
        Start: new Date(),
        End: new Date(),
        Location: 'Zoom',
        Description: 'asfd asdf adsf asdf asdf',
      });
      expect(testCalendarEvent.Type).to.equal('Other');
    });
    it('can not be an empty string', async () => {
      newCalendarEvent.Type = '';
      const testCalendarEvent = CalendarEvent.build(newCalendarEvent);

      try {
        await testCalendarEvent.save();
        throw Error('validation should have failed with empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation isIn on Type failed');
      }
    });
    it('can not be a random string', async () => {
      newCalendarEvent.Type = 'Hello';
      const testCalendarEvent = CalendarEvent.build(newCalendarEvent);

      try {
        await testCalendarEvent.save();
        throw Error('validation should have failed with random string');
      } catch (err) {
        expect(err.message).to.contain('Validation isIn on Type failed');
      }
    });
  });
  describe('Start', () => {
    it('Start is a date', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      assert.deepEqual(hannah.Start, newCalendarEvent.Start);
      expect(typeof hannah.Start).to.equal('object');
    });
    it('cannot be null', async () => {
      const testCalendarEvent = CalendarEvent.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        CalendarEventship: 'Full',
        DueYear: '2020',
        email: 'cody@email.com',
      });
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('Start cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newCalendarEvent.Start = '';
      const testCalendarEvent = await CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with empty Start');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Start failed');
      }
    });
    it('must be a date', async () => {
      newCalendarEvent.Start = 'hello world';
      const testCalendarEvent = await CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on Start failed');
      }
    });
  });
  describe('End', () => {
    it('End is a date', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      assert.deepEqual(hannah.End, newCalendarEvent.End);
      expect(typeof hannah.End).to.equal('object');
    });
    it('cannot be null', async () => {
      const testCalendarEvent = CalendarEvent.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        CalendarEventship: 'Full',
        DueYear: '2020',
        email: 'cody@email.com',
      });
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('End cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newCalendarEvent.End = '';
      const testCalendarEvent = await CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with empty End');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on End failed');
      }
    });
    it('must be a date', async () => {
      newCalendarEvent.End = 'hello world';
      const testCalendarEvent = await CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on End failed');
      }
    });
  });
  describe('Description', () => {
    it('is a string', async () => {
      const hannah = await CalendarEvent.create(newCalendarEvent);
      expect(hannah.Description).to.equal('asfd asdf adsf asdf asdf');
      expect(typeof hannah.Description).to.equal('string');
    });
    it('Name cannot be an empty string', async () => {
      // We also shouldn't be able to create a CalendarEvent with an empty name.
      newCalendarEvent.Description = '';
      const testCalendarEvent = CalendarEvent.build(newCalendarEvent);
      try {
        await testCalendarEvent.validate();
        throw Error('validation should have failed with empty Description');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Description failed'
        );
      }
    });
  });
});
