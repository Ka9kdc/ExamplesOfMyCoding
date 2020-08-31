const express = require('express')
const path = require("path");
const morgan = require('morgan')
const {db} = require('./models')

const app = new express()

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


const PORT = 1432;
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