const Product = require('../models/product.model');

module.exports = {
  getAll: async (req, res) => {
    try {
      const productos = await Product.findAll();
      res.json(productos);
    } catch (err) {
      console.error('Error en getAll:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Product.findById(id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (err) {
      console.error('Error en getById:', err);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  },

  create: async (req, res) => {
    try {
      const nuevo = req.body;
      if (!nuevo.nombre || nuevo.precio === undefined) {
        return res.status(400).json({ error: 'Faltan datos' });
      }
      const id = await Product.create(nuevo);
      res.status(201).json({ id });
    } catch (err) {
      console.error('Error en create:', err);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      await Product.update(id, datos);
      res.json({ id });
    } catch (err) {
      console.error('Error en update:', err);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.delete(id);
      res.json({ id });
    } catch (err) {
      console.error('Error en remove:', err);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
};
