const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error('MONGODB_URI no está definido en .env');

const client = new MongoClient(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
});

let db = null;

module.exports = {
connect: async () => {
await client.connect();
db = client.db(); 
console.log('Conectado a MongoDB Atlas');
},
getDB: () => db,
getClient: () => client,
};