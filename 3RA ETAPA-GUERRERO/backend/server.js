require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const productsRoutes = require('./routes/products.routes');
const carritoRoutes = require('./routes/carrito.routes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/productos', productsRoutes);
app.use('/api/carrito', carritoRoutes);

app.get('/', (req, res) => {
res.send('Backend TenisShop funcionando');
});

(async () => {
try {
await db.connect();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
console.error('No se pudo conectar a la base de datos', err);
process.exit(1);
}
})();