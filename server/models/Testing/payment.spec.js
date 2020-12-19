const { expect, assert } = require('chai');
const db = require('../db');
const Payment = require('../payment');

//Tests 9 tests written and passing. none pending or failing
describe('Payment Model', () => {
  // before(() => db.sync({ force: true }));

  let newPayment;
  beforeEach(async() => {
    await db.sync({ force: true })
    newPayment = {
      Amount: 12345,
      PaymentDate: new Date(),
    };
  });

  describe('Amount', () => {
    it('is a decimal', async () => {
      const hannah = await Payment.create(newPayment);
      expect(hannah.Amount).to.equal(12345);
      expect(typeof hannah.Amount).to.equal('number');
    });
    it('cannot be null', async () => {
      const testPayment = Payment.build({
        PaymentDate: new Date(),
      });
      try {
        await testPayment.validate();
        throw Error('validation should have failed without an Amount');
      } catch (err) {
        expect(err.message).to.contain('Amount cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newPayment.Amount = '';
      const testPayment = await Payment.build(newPayment);
      try {
        await testPayment.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Amount');
      }
    });
    it('cannot be negetive', async () => {
      newPayment.Amount = -0.1;
      const testPayment = await Payment.build(newPayment);
      try {
        await testPayment.validate();
        throw Error('validation should have failed with empty amount');
      } catch (err) {
        expect(err.message).to.contain('Validation min on Amount');
      }
    });
    it('cannot have decimal places', async () => {
      newPayment.Amount = 12345.6789;
      const testPayment = await Payment.build(newPayment);
      try {
        await testPayment.save();
        throw Error(
          'validation should have failed with to many decimals amount'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });

  describe('Payment Date', () => {
    it('Payment Date is a date', async () => {
      const hannah = await Payment.create(newPayment);
      assert.deepEqual(hannah.PaymentDate, newPayment.PaymentDate);
      expect(typeof hannah.PaymentDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testPayment = Payment.build({
        Amount: 12345,
      });
      try {
        await testPayment.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('PaymentDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newPayment.PaymentDate = '';
      const testPayment = await Payment.build(newPayment);
      try {
        await testPayment.validate();
        throw Error('validation should have failed with empty Payment date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on PaymentDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newPayment.PaymentDate = 'hello world';
      const testPayment = await Payment.build(newPayment);
      try {
        await testPayment.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isDate on PaymentDate failed'
        );
      }
    });
  });
});
