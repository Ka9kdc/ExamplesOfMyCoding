const { expect, assert } = require('chai');
const db = require('../db');
const { Order } = require('./vendors');

//Tests 32 tests written and passing. none pending or failing
describe('Order Model', () => {
  before(() => db.sync({ force: true }));

  let newOrder;
  beforeEach(() => {
    newOrder = {
      Tickets: 1,
      Tables: 1,
      Chairs: 1,
      Electical: true,
      Raffle: 1,
      Amount: 12345,
      OrderDate: new Date(),
    };
  });
  describe('Tickets', () => {
    it('is a number', async () => {
      const hannah = await Order.create(newOrder);
      expect(hannah.Tickets).to.equal(1);
      expect(typeof hannah.Tickets).to.equal('number');
    });
    it('cannot be null', async () => {
      const testOrder = Order.build({
        Raffle: 1,
        Amount: 12345,
        OrderDate: new Date(),
      });
      try {
        await testOrder.validate();
        throw Error('validation should have failed without an Tickets');
      } catch (err) {
        expect(err.message).to.contain('Tickets cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOrder.Tickets = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Tickets');
      }
    });
    it('cannot be negetive', async () => {
      newOrder.Tickets = -0.1;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tickets');
      }
    });
    it('cannot be 0', async () => {
      newOrder.Tickets = 0;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tickets');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tickets');
      }
    });
    it('cannot have decimal places', async () => {
      newOrder.Tickets = 12345.6789;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.save();
        throw Error(
          'validation should have failed with to many decimals tickets'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('Tables', () => {
    it('is a number', async () => {
      const hannah = await Order.create(newOrder);
      expect(hannah.Tables).to.equal(1);
      expect(typeof hannah.Tables).to.equal('number');
    });
    it('cannot be null', async () => {
      const testOrder = Order.build({
        Tickets: 1,
        Chairs: 1,
        Electical: true,
        Raffle: 1,
        Amount: 12345,
        OrderDate: new Date(),
      });
      try {
        await testOrder.validate();
        throw Error('validation should have failed without an Tables');
      } catch (err) {
        expect(err.message).to.contain('Tables cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOrder.Tables = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tables');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Tables');
      }
    });
    it('cannot be negetive', async () => {
      newOrder.Tables = -0.1;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tables');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tables');
      }
    });
    it('cannot be 0', async () => {
      newOrder.Tables = 0;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Tables');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Tables');
      }
    });
    it('cannot have decimal places', async () => {
      newOrder.Tables = 12345.6789;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.save();
        throw Error(
          'validation should have failed with to many decimals tables'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('Chairs', () => {
    it('is a decimal', async () => {
      const hannah = await Order.create(newOrder);
      expect(hannah.Chairs).to.equal(1);
      expect(typeof hannah.Chairs).to.equal('number');
    });
    it('cannot be empty', async () => {
      newOrder.Chairs = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Chairs');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Chairs');
      }
    });
    it('cannot be negetive', async () => {
      newOrder.Chairs = -0.1;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Chairs');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Chairs');
      }
    });
    it('cannot have decimal places', async () => {
      newOrder.Chairs = 12345.6789;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.save();
        throw Error(
          'validation should have failed with to many decimals Chairs'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('Electical', () => {
    it(' is a boolean', async () => {
      const hannah = await Order.create(newOrder);
      expect(hannah.Electical).to.equal(true);
      expect(typeof hannah.Electical).to.equal('boolean');
    });
    it('can be false', async () => {
      newOrder.Electical = false;
      const hannah = await Order.create(newOrder);
      expect(hannah.Electical).to.equal(false);
    });
    it('can be null', async () => {
      const hannah = await Order.create({
        Tickets: 1,
        Tables: 1,
        Chairs: 1,
        Raffle: 1,
        Amount: 12345,
        OrderDate: new Date(),
      });
      expect(hannah.Electical).to.equal(null);
    });
  });
  describe('Raffle', () => {
    it('is a decimal', async () => {
      const hannah = await Order.create(newOrder);
      expect(hannah.Raffle).to.equal(1);
      expect(typeof hannah.Raffle).to.equal('number');
    });
    it('cannot be empty', async () => {
      newOrder.Raffle = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Raffle');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Raffle');
      }
    });
    it('cannot be negetive', async () => {
      newOrder.Raffle = -0.1;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Raffle');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Raffle');
      }
    });
    it('cannot have decimal places', async () => {
      newOrder.Raffle = 12345.6789;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.save();
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
      const hannah = await Order.create(newOrder);
      expect(hannah.Amount).to.equal(12345);
      expect(typeof hannah.Amount).to.equal('number');
    });
    it('cannot be null', async () => {
      const testOrder = Order.build({
        Tickets: 1,
        Raffle: 1,
        OrderDate: new Date(),
      });
      try {
        await testOrder.validate();
        throw Error('validation should have failed without an Amount');
      } catch (err) {
        expect(err.message).to.contain('Amount cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOrder.Amount = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Amount');
      }
    });
    it('cannot be negetive', async () => {
      newOrder.Amount = -0.1;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Amount');
      }
    });
    it('cannot have decimal places', async () => {
      newOrder.Amount = 12345.6789;
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.save();
        throw Error(
          'validation should have failed with to many decimals amount'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });

  describe('Order Date', () => {
    it('Order Date is a date', async () => {
      const hannah = await Order.create(newOrder);
      assert.deepEqual(hannah.OrderDate, newOrder.OrderDate);
      expect(typeof hannah.OrderDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testOrder = Order.build({
        Amount: 12345,
        Tickets: 1,
        Raffle: 1,
      });
      try {
        await testOrder.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('OrderDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOrder.OrderDate = '';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with empty Order date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on OrderDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newOrder.OrderDate = 'hello world';
      const testOrder = await Order.build(newOrder);
      try {
        await testOrder.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on OrderDate failed');
      }
    });
  });
});
