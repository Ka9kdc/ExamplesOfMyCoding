const Sequelize = require("sequelize");
const db = require("./db")


const Member = db.define("member", {
    FirstName:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: true
        }
    },
    LastName:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: true
        }
    },
    Callsign: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    Phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Street: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    City: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    State: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Zip: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    Membership: {
        type: Sequelize.ENUM('Full', 'Senior', 'Student', 'Family', 'Associate', 'Lifetime'),
        allowNull: false,
        defaultValue: 'Full'
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    DueYear: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    RenewalDate: {
        type: Sequelize.DATE
    }
});

const Badge = db.define('badge', {
    Desired: {
        type: Sequelize.BOOLEAN
    },
    Name:{
        type: Sequelize.STRING
    },
    Arrl: {
        type: Sequelize.BOOLEAN
    },
    Color: {
        type: Sequelize.ENUM('Red', 'White', 'Black', 'Blue', 'Green', 'Red, White and Blue', 'Brown', '')
    },
    Type: {
        type: Sequelize.ENUM('NoPreference', 'Lanyard', 'Pin', 'Magnet', 'Notch')
    },
    LicenseYear: {
        type: Sequelize.INTEGER
    },
    RenewalDate: {
        type: Sequelize.DATE
    }
})

const Committee = db.define('committee', {
    Hamfest: {
        type: Sequelize.BOOLEAN
    },
    FieldDay: {
        type: Sequelize.BOOLEAN
    },
    PublicService: {
        type: Sequelize.BOOLEAN
    },
    MembershipCommittee: {
        type: Sequelize.BOOLEAN
    },
    Publicity: {
        type: Sequelize.BOOLEAN
    },
    Fundraising: {
        type: Sequelize.BOOLEAN
    },
    MeetingPrograms: {
        type: Sequelize.BOOLEAN
    },
    ClubOfficer: {
        type: Sequelize.BOOLEAN
    },
    HamLetter: {
        type: Sequelize.BOOLEAN
    },
    Website: {
        type: Sequelize.BOOLEAN
    },
    csuTrailer: {
        type: Sequelize.BOOLEAN
    },
    Repeaters: {
        type: Sequelize.BOOLEAN
    },
    Net: {
        type: Sequelize.BOOLEAN
    },
    Training: {
        type: Sequelize.BOOLEAN
    },
    YouthPrograms: {
        type: Sequelize.BOOLEAN
    },
    VEtesting: {
        type: Sequelize.BOOLEAN
    },
    other: {
        type: Sequelize.STRING
    } 
})

module.exports = {
    Member,
    Badge,
    Committee
}