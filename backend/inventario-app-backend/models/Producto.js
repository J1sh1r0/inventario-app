const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true, // Asocia el producto al usuario que lo registró
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
