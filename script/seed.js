const {db, User, Product, OfficerHistory} = require('../server/models')
const { pastOfficers } = require('./officerHistorySeed')


let newProducts = [
        {name: 'Advanced Tickets', dataName: 'Tickets', price: 8, onSale: true, description: 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.', photo: '/Images/f89b7cbe4e61a04129304e6ce498afb2.png'},
        {name: "Table", dataName: "Tables", description: 'An 8 foot by 4 foot folding table.', price: 25, onSale: true, photo: '/Images/download.jpeg'},
        {name: "Extra chair", dataName: "Chairs", description: 'A metal folding chair. One chair is provided with each Vendor request.', price: 2, onSale: false, photo: '/Images/folding-chair-garden-furniture-stainless-steel-chair.jpg'},
        {name: "Electrical", dataName: "Electrical", description: 'An Electrical drop', price: 15, onSale: false,  photo: '/Images/electricOutlet.png'}
    ]

const seed = async () => {
    try {
        await  db.sync( {force: true})
        await User.create({Callsign: 'ka9kdc', password: '12345', email: 'ka9kdc@gmail.com'})
        await newProducts.forEach( async product => {
            await Product.create(product)
        })
        await pastOfficers.forEach( async officers => {
            await OfficerHistory.create(officers)
        })
    } catch(error) {
        console.log(error)
    }
}


module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
    seed()
      .then(() => {
        console.log("Seeding success!");
        db.close();
      })
      .catch((err) => {
        console.error("Oh noes! Something went wrong!");
        console.error(err);
        db.close();
      });
    }