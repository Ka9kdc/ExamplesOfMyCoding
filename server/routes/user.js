const router = require('express').Router()
const {User} = require('../models')

router.get('/me', (req, res, next) =>{
    res.json(req.user)
})


router.put('/login', (req, res ,next) =>{
    User.findOne({
        where: {
            Callsign: req.body.Callsign
        }
    }).then(user => {
        if(!user) res.status(401).send('User not found')
        else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect Password')
        else {
            req.login(user, err => {
                if(err) next(err);
                else res.json(user);
            })
        }
    }).catch(next)
})

router.post('/signup', (req, res, next) =>{
    User.Create({
        Callsign: req.body.Callsign,
        password: req.body.password
    }).than(user =>{
       req.login(user, err =>{
           if(err) next(err)
           else res.json(user)
       })
    }).catch(next)
})

router.delete('/logout', (req, res, next) =>{
    req.logout();
    req.session.destroy()
    res.sendStatus(204)
})


module.exports = router