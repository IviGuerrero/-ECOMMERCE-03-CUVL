const db = require('../config/db');

module.exports = {
createOrder: async (req, res) => {
try {
const carrito = req.body; 
console.log('Carrito recibido:', JSON.stringify(carrito));

const collection = db.getDB().collection('pedidos');
const result = await collection.insertOne({ carrito, createdAt: new Date() });

res.status(201).json({ ok: true, id: result.insertedId });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Error al procesar carrito' });
}
}
};
