module.exports = {
   port: process.env.PORT || 3001,
   db: process.env.MONGODB || 'mongodb://localhost:27017/apirest',
   SECRET_TOKEN: 'miclavedetokens'
};
