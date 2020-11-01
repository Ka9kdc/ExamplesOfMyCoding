const {db, User, Product} = require('../server/models')


let newProducts = [
        {name: 'Advanced Tickets', dataName: 'Tickets', price: 8, onSale: true, description: 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.', photo: '/Images/f89b7cbe4e61a04129304e6ce498afb2.png'},
        {name: "Table", dataName: "Tables", description: 'An 8 foot by 4 foot folding table.', price: 25, onSale: true, photo: '/Images/download.jpeg'},
        {name: "Extra chair", dataName: "Chairs", description: 'A metal folding chair. One chair is provided with each Vendor request.', price: 2, onSale: false, photo: '/Images/folding-chair-garden-furniture-stainless-steel-chair.jpg'},
        {name: "Electrical", dataName: "Electrical", description: 'An Electrical drop', price: 15, onSale: false,  photo: '/Images/electricOutlet.png'}
    ]

const seed = async () => {
    try {
        await  db.sync( {force: true})
        await User.create({Callsign: 'ka9kdc', password: '12345'})
        await newProducts.forEach( async product => {
            await Product.create(product)
        })
    } catch(error) {
        console.log(error)
    }
}

seed()
.then(() =>{
    console.log('Seeding success!');
    setTimeout(() => db.close(),1000) 
}).catch((err) =>{
    console.log(err)
    db.close()
})
