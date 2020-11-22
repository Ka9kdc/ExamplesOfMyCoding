const { expect, assert } = require('chai');
const db = require('../db');
const { Ticket } = require('../Attendees');

//Tests 19 tests written and passing. none pending or failing
describe('Ticket Model', () => {
  before(() => db.sync({ force: true }));

  let newTicket;
  beforeEach(() => {
    newTicket = {
      Tickets: 1,
      Raffle: 1,
      Amount: 12345,
      OrderDate: new Date(),
    };
  });
  describe('Tickets', () => {
    it('is a number', async () => {
      const hannah = await Ticket.create(newTicket);
      expect(hannah.Tickets).to.equal(1);
      expect(typeof hannah.Tickets).to.equal('number');
    });
    it('cannot be null', async () => {
      const testTicket = Ticket.build({
        Raffle: 1,
        Amount: 12345,
        OrderDate: new Date(),
      });
      try {
        await testTicket.validate();
        throw Error('validation should have failed without an Tickets');
      } catch (err) {
        expect(err.message).to.contain('Tickets cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newTicket.Tickets = '';
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Tickets');
      }
    });
    it('cannot be negetive', async () => {
      newTicket.Tickets = -0.1;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tickets');
      }
    });
    it('cannot be 0', async () => {
      newTicket.Tickets = 0;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tickets');
      }
    });
    it('cannot have decimal places', async () => {
      newTicket.Tickets = 12345.6789;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.save();
        throw Error(
          'validation should have failed with to many decimals tickets'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('Raffle', () => {
    it('is a decimal', async () => {
      const hannah = await Ticket.create(newTicket);
      expect(hannah.Raffle).to.equal(1);
      expect(typeof hannah.Raffle).to.equal('number');
    });
    it('cannot be empty', async () => {
      newTicket.Raffle = '';
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Raffle');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Raffle');
      }
    });
    it('cannot be negetive', async () => {
      newTicket.Raffle = -0.1;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Raffle');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Raffle');
      }
    });
    it('cannot have decimal places', async () => {
      newTicket.Raffle = 12345.6789;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.save();
        throw Error(
          'validation should have failed with to many decimals Raffle'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('Amount', () => {
    it('is a decimal', async () => {
      const hannah = await Ticket.create(newTicket);
      expect(hannah.Amount).to.equal(12345);
      expect(typeof hannah.Amount).to.equal('number');
    });
    it('cannot be null', async () => {
      const testTicket = Ticket.build({
        Tickets: 1,
        Raffle: 1,
        OrderDate: new Date(),
      });
      try {
        await testTicket.validate();
        throw Error('validation should have failed without an Amount');
      } catch (err) {
        expect(err.message).to.contain('Amount cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newTicket.Amount = '';
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Amount');
      }
    });
    it('cannot be negetive', async () => {
      newTicket.Amount = -0.1;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Amount');
      }
    });
    it('cannot have decimal places', async () => {
      newTicket.Amount = 12345.6789;
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.save();
        throw Error(
          'validation should have failed with to many decimals amount'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });

  describe('Ticket Date', () => {
    it('Ticket Date is a date', async () => {
      const hannah = await Ticket.create(newTicket);
      assert.deepEqual(hannah.OrderDate, newTicket.OrderDate);
      expect(typeof hannah.OrderDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testTicket = Ticket.build({
        Amount: 12345,
        Tickets: 1,
        Raffle: 1,
      });
      try {
        await testTicket.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('OrderDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newTicket.OrderDate = '';
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with empty Ticket date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on OrderDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newTicket.OrderDate = 'hello world';
      const testTicket = await Ticket.build(newTicket);
      try {
        await testTicket.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on OrderDate failed');
      }
    });
  });
});
