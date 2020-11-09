
const express = require('express')
const path = require("path");
const morgan = require('morgan')
const {db, User} = require('./models')
const session = require('express-session')
const passport = require('passport');
const PORT = process.env.PORT || 1432;

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const dbStore = new SequelizeStore({db:db})

const app = express()

dbStore.sync()

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === "test") {
  after("close the session store", () => sessionStore.stopExpiringSessions());
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
// if (process.env.NODE_ENV === "development") 
require("../secrets");


app.use(session({
  secret: process.env.SESSION_SECRET,
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) =>{
  try{
    done(null, user)
  } catch(error){
    done(error)
  }
})

passport.deserializeUser((id, done) =>{
  User.findByPk(id.id)
  .then(user => done(null, user))
  .catch(done)
})

app.use(morgan("dev")); //logging middleware

// body parsing middleware
//parsing middleware for form input data
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
// static middleware
app.use(express.static(path.join(__dirname, "..", "/public")))

app.use('/api', require('./routes/api'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})


  // Move to is own page later
  const init = async () => {
    try {

      await db.sync({
        // force:true
      });
      
      app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Error starting server:', error)
    }
  };
  
  init();

  module.exports = app