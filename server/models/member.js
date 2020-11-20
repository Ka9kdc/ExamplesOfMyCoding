const Sequelize = require('sequelize');
const db = require('./db');

const Member = db.define('member', {
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  Callsign: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      is: /^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/,
    },
  },
  Phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i,
    },
  },
  Street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /^[-!$%^&*()_+|~=`{}[:;<>?@#\]]/g,
    },
  },
  City: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /^[-!$%^&*()_+|~=`{}[:;<>?,@#\]]/g,
    },
  },
  State: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/,
    },
  },
  Zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^\d{5}(-\d{4})?$/,
    },
  },
  Membership: {
    type: Sequelize.ENUM(
      'Full',
      'Senior',
      'Student',
      'Family',
      'Associate',
      'Lifetime'
    ),
    allowNull: false,
    defaultValue: 'Full',
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  DueYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 2020,
      max: 2050
    },
  },
  RenewalDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true, 
    },
  },
});

const Badge = db.define('badge', {
  Desired: {
    type: Sequelize.BOOLEAN,
  },
  Name: {
    type: Sequelize.STRING,
  },
  Arrl: {
    type: Sequelize.BOOLEAN,
  },
  Color: {
    type: Sequelize.ENUM(
      'Red',
      'White',
      'Black',
      'Blue',
      'Green',
      'Red, White and Blue',
      'Brown',
      ''
    ),
  },
  Type: {
    type: Sequelize.ENUM('NoPreference', 'Lanyard', 'Pin', 'Magnet', 'Notch'),
  },
  LicenseYear: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1920,
      max: 2100,
    },
  },
  RenewalDate: {
    type: Sequelize.DATE,
  },
});

const Committee = db.define('committee', {
  Hamfest: {
    type: Sequelize.BOOLEAN,
  },
  FieldDay: {
    type: Sequelize.BOOLEAN,
  },
  PublicService: {
    type: Sequelize.BOOLEAN,
  },
  MembershipCommittee: {
    type: Sequelize.BOOLEAN,
  },
  Publicity: {
    type: Sequelize.BOOLEAN,
  },
  Fundraising: {
    type: Sequelize.BOOLEAN,
  },
  MeetingPrograms: {
    type: Sequelize.BOOLEAN,
  },
  ClubOfficer: {
    type: Sequelize.BOOLEAN,
  },
  HamLetter: {
    type: Sequelize.BOOLEAN,
  },
  Website: {
    type: Sequelize.BOOLEAN,
  },
  csuTrailer: {
    type: Sequelize.BOOLEAN,
  },
  Repeaters: {
    type: Sequelize.BOOLEAN,
  },
  Net: {
    type: Sequelize.BOOLEAN,
  },
  Training: {
    type: Sequelize.BOOLEAN,
  },
  YouthPrograms: {
    type: Sequelize.BOOLEAN,
  },
  VEtesting: {
    type: Sequelize.BOOLEAN,
  },
  other: {
    type: Sequelize.STRING,
  },
});

module.exports = {
  Member,
  Badge,
  Committee,
};
