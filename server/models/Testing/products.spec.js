const { expect } = require('chai');
const db = require('../db');
const Product = require('../Products');

//Tests: 24 passing 3 pending 0 failing
describe('Products Model', () => {
  // before(() => db.sync({ force: true }));
  let newProduct;
  beforeEach(async() => {
    await db.sync({ force: true })
    newProduct = {
      name: 'Electrical Drop',
      dataName: 'Electrical',
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '/Images/electricOutlet.png',
    };
  });
  describe('name field', () => {
    it('name is a string', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.name).to.equal('Electrical Drop');
      expect(typeof hannah.name).to.equal('string');
    });
    it('name cannot be null', async () => {
      // We shouldn't be able to create a Product without a name.
      const testProduct = Product.build({
        dataName: 'Electrical',
        description: 'An Electrical drop',
        price: 15,
        onSale: false,
        photo: '/Images/electricOutlet.png',
      });
      try {
        await testProduct.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('name cannot be null');
      }
    });
    it('name cannot be an empty string', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.name = '';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name failed');
      }
    });
    xit('name cannot have numbers', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.name = 'abc123';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with numbers in name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on name failed');
      }
    });
    xit('name cannot have symbols', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.name = 'abc;jhg';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with symbols in name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on name failed');
      }
    });
  });
  describe('dataName', () => {
    it('dataName is a string', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.dataName).to.equal('Electrical');
      expect(typeof hannah.dataName).to.equal('string');
    });
    it('dataName cannot be null', async () => {
      // We shouldn't be able to create a Product without a name.
      const testProduct = Product.build({
        name: 'Electrical Drop',
        description: 'An Electrical drop',
        price: 15,
        onSale: false,
        photo: '/Images/electricOutlet.png',
      });
      try {
        await testProduct.validate();
        throw Error('validation should have failed without a Last name');
      } catch (err) {
        expect(err.message).to.contain('dataName cannot be null');
      }
    });
    it('dataName cannot be an empty string', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.dataName = '';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty dataName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on dataName failed'
        );
      }
    });
    it('dataName cannot have numbers', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.dataName = 'abc123';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with numbers in dataName');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on dataName failed');
      }
    });
    it('dataName cannot have symbols', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.dataName = 'abc;jhg';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with symbols in dataName');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on dataName failed');
      }
    });
  });
  describe('price', () => {
    it('is a decimal', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.price).to.equal(15);
      expect(typeof hannah.price).to.equal('number');
    });
    it('cannot be null', async () => {
      const testProduct = Product.build({
        name: 'Electrical Drop',
        dataName: 'Electrical',
        description: 'An Electrical drop',
        onSale: false,
        photo: '/Images/electricOutlet.png',
      });
      try {
        await testProduct.validate();
        throw Error('validation should have failed without a price');
      } catch (err) {
        expect(err.message).to.contain('price cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newProduct.price = '';
      const testProduct = await Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty price');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on price');
      }
    });
    it('cannot be negetive', async () => {
      newProduct.price = -0.1;
      const testProduct = await Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty price');
      } catch (err) {
        expect(err.message).to.contain('Validation min on price');
      }
    });
    it('cannot have decimal places', async () => {
      newProduct.price = 12345.6789;
      const testProduct = await Product.build(newProduct);
      try {
        await testProduct.save();
        throw Error(
          'validation should have failed with to many decimals price'
        );
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
  });
  describe('onSale', () => {
    it(' is a boolean', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.onSale).to.equal(false);
      expect(typeof hannah.onSale).to.equal('boolean');
    });
    it('can be true', async () => {
      newProduct.onSale = true;
      const hannah = await Product.create(newProduct);
      expect(hannah.onSale).to.equal(true);
    });
    it('defualts to false when null is passed in', async () => {
      const hannah = await Product.create({
        name: 'Electrical Drop',
        dataName: 'Electrical',
        description: 'An Electrical drop',
        price: 15,
        photo: '/Images/electricOutlet.png',
      });
      expect(hannah.onSale).to.equal(false);
    });
  });
  describe('description field', () => {
    it('description is a string', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.description).to.equal('An Electrical drop');
      expect(typeof hannah.description).to.equal('string');
    });
    it('description cannot be null', async () => {
      // We shouldn't be able to create a Product without a name.
      const testProduct = Product.build({
        name: 'Electrical Drop',
        dataName: 'Electrical',

        price: 15,
        onSale: false,
        photo: '/Images/electricOutlet.png',
      });
      try {
        await testProduct.validate();
        throw Error(
          'validation should have failed without a first description'
        );
      } catch (err) {
        expect(err.message).to.contain('description cannot be null');
      }
    });
    it('description cannot be an empty string', async () => {
      // We also shouldn't be able to create a Product with an empty name.
      newProduct.description = '';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty description');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on description failed'
        );
      }
    });
    it('description can be  short string', async () => {
      let short = 'asdaf';
      newProduct.description = short;
      const hannah = await Product.create(newProduct);
      expect(hannah.description).to.equal(short);
      expect(typeof hannah.description).to.equal('string');
    });
    it('description can be  a long string', async () => {
      let long =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor.';
      newProduct.description = long;
      const hannah = await Product.create(newProduct);
      expect(hannah.description).to.equal(long);
      expect(typeof hannah.description).to.equal('string');
    });
    it('description can be a very long string', async () => {
      let long =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor.';
      newProduct.description = long;
      const hannah = await Product.create(newProduct);
      expect(hannah.description).to.equal(long);
      expect(typeof hannah.description).to.equal('string');
    });
  });
  describe('photo', () => {
    it('photo is a string', async () => {
      const hannah = await Product.create(newProduct);
      expect(hannah.photo).to.equal('/Images/electricOutlet.png');
      expect(typeof hannah.photo).to.equal('string');
    });
    xit('photo cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testProduct = Product.build({
        name: 'Electrical Drop',
        dataName: 'Electrical',
        description: 'An Electrical drop',
        price: 15,
        onSale: false,
      });
      try {
        await testProduct.validate();
        throw Error('validation should have failed without a Last name');
      } catch (err) {
        expect(err.message).to.contain('photo cannot be null');
      }
    });
    it('photo cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newProduct.photo = '';
      const testProduct = Product.build(newProduct);
      try {
        await testProduct.validate();
        throw Error('validation should have failed with empty photo');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on photo failed');
      }
    });
  });
});
