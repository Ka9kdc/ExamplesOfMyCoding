const Sequelize = require('sequelize')
const crypto = require('crypto')
const _ = require('lodash')
const db = require('./db')

const User = db.define('user', {
    email:{
        type: Sequelize.STRING,
    },
    name: { 
        type: Sequelize.STRING,
    },
    googleId: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    onBoard: {
        type: Sequelize.BOOLEAN
    }
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

User.prototype.hasMatchingPassword = function (candidatePassword){
    // should return true or false for if the entered password matches
      return User.encryptPassword(candidatePassword, this.salt)
  }

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt'])
}

User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
    
    const hash = crypto.createHash('sha1')
    hash.update(plainText)
    hash.update(salt)
    return hash.digest('hex')
}

function setSaltAndPassword (user){
  if(user.changed('password')){
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password, user.salt)
  }
}


module.exports = User