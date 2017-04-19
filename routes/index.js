'use strict'

const express           = require('express');
const userCtrl          = require('../controllers/user');
const auth              = require('../middlewares/auth');
const api               = express.Router();


//Rutas publicas
api.post('/user', userCtrl.signUp);

api.get("/a",function(req,res){
   res.status(200).send({message: 'entras a A'});
})

api.get('/private', auth, function(req, res){
   res.status(200).send({message: 'tienes acceso'});
});
//Rutas privadas
api.use(auth);
api.get("/b",function(req,res){
   res.status(200).send({message: 'entras a b'});
})


module.exports = api;
