const express = require('express')
const path = require("path");
const morgan = require('morgan')
const {db} = require('./models')

const app = new express()

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "..", "/public")))
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());

app.use('/api', require('./routes/api'))

app.use((err, req, res, next) =>{
    console.log(error)
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