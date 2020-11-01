const router = require('express').Router()
const {User} = require('../models')
const { Member } = require('../models/member')

router.get('/me', (req, res, next) =>{
    console.log(req.session)
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
    Member.findOne({where: {
        Callsign: req.body.Callsign
    }}).then(member => {
        if(!member) res.status(404).send('Membership not found')
        else {
            User.create({
                Callsign: req.body.Callsign,
                name: member.FirstName,
                password: req.body.password,
                memberId: member.id
            }).then(user =>{
                req.login(user, err =>{
                    if(err) next(err)
                    else res.json(user)
                })
            })
        }
    }).catch(next)
})

router.delete('/logout', (req, res, next) =>{
    req.logout();
    req.session.destroy()
    res.sendStatus(204)
})


module.exports = router