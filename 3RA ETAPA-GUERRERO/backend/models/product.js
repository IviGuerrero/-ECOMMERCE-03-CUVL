const db = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'productos';

module.exports = {
findAll: async () => {
const collection = db.getDB().collection(COLLECTION);
return await collection.find({}).toArray();
},

findById: async (id) => {
const collection = db.getDB().collection(COLLECTION);
return await collection.findOne({ _id: new ObjectId(id) });
},

create: async (producto) => {
const collection = db.getDB().collection(COLLECTION);
const res = await collection.insertOne(producto);
return res.insertedId;
},

update: async (id, producto) => {
const collection = db.getDB().collection(COLLECTION);
await collection.updateOne({ _id: new ObjectId(id) }, { $set: producto });
return id;
},

delete: async (id) => {
const collection = db.getDB().collection(COLLECTION);
await collection.deleteOne({ _id: new ObjectId(id) });
return id;
}
};