'use strict'

const mongoose       = require('mongoose')
const Schema         = mongoose.Schema
const bcrypt         = require('bcrypt-nodejs')
const crypto         = require('crypto')

const UserSchema = new Schema({
   email: {type: String, unique: true, lowercase: true},
   displayName: String,
   password: {type: String, select: false},
   signupDate: {type: Date, default: Date.now()},
   lastLogin: Date
})


UserSchema.pre('save',  function(done)  {
   var user = this;

   if(this.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
         if(err) return next()
         bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);

            user.password = hash;
            done();
         });
      });
   } else {
      return done();
   }
});

// UserSchema.pre('save', (next) => {
//    let user = this
//
//    // only hash the password if it has been modified (or is new)
//    if (!user.isModified('password')) return next();
//
//    bcrypt.genSalt(10, (err, salt) => {
//       if(err) return next()
//
//       bcrypt.hash(user.password, salt, null, (err, hash) => {
//          if(err) return next(err)
//
//          user.password = hash
//          next();
//       })
//    })
// })

module.exports = mongoose.model('User', UserSchema);
