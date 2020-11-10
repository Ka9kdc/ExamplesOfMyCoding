const Sequelize = require('sequelize')
const crypto = require('crypto')
const _ = require('lodash')
const db = require('./db')

const User = db.define('user', {
    Callsign: {
        type: Sequelize.STRING,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    name: { 
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        // Making `.password` act like a func hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue("password");
        },
      },
      salt: {
        type: Sequelize.STRING,
        // Making `.salt` act like a function hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue("salt");
        },
      },
    //   googleId: {
    //     type: Sequelize.STRING,
    //   },
    onBoard: {
        type: Sequelize.BOOLEAN
    }
});



// User.prototype.sanitize = function () {
//   return _.omit(this.toJSON(), ['password', 'salt'])
// }

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
  };
  
  /**
   * classMethods
   */
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString("base64");
  };
  
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");
  };
  
  /**
   * hooks
   */
  const setSaltAndPassword = (user) => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);
  User.beforeBulkCreate((users) => {
    users.forEach(setSaltAndPassword);
  });


module.exports = User