const {db, User} = require('./server/models')


const seed = async () => {
    try {
        await  db.sync( {force: true})
        await User.create({email: 'kmschroeder91@gmail.com', password: '12345'})
    } catch(error) {
        console.log(error)
    }
}

seed()
.then(() =>{
    console.log('Seeding success!');
    db.close()
}).catch((err) =>{
    console.log(err)
    db.close()
})
