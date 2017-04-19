'use strict'

const User                 = require('../models/user');
const service              = require('../services');

function signUp(req, res){
   let user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
   });

   console.log("user",user);

   user.save((err) => {
      if(err) return res.status(500).send({message: 'Error al crear el usuario: '+err});

      return res.status(201).send({token: service.createToken(user)});
   })

}

function signIn(req, res){
   user.find({email: req.body.email}, (err, user) =>{
      if(err) return res.status(500).send({message: err});
      if(!user) return res.status(404).send({message: 'no existe el usuario'});

      req.user = user;
      res.status(200).send({
         message: 'Te has logueado correctamente',
         token: service.createToken(user)
      });
   })
}

module.exports = {
   signUp,
   signIn
};
// {
//   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGY2ZGJkMjZlNDE3YzUxOWZkMjEzMTUiLCJpYXQiOjE0OTI1NzMxMzgsImV4cCI6MTQ5Mzc4MjczOH0.sXenfKTIE6iUpyNhz-h4aJQXdwYz-RaEKi8yTWRJds8"
// }
