const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const proteger = require('../middlewares/authMiddleware');

// CRUD de productos
router.post('/', proteger, productoController.crearProducto);
router.get('/', proteger, productoController.obtenerProductos);
router.get('/:id', proteger, productoController.obtenerProductoPorId);
router.put('/:id', proteger, productoController.actualizarProducto);
router.delete('/:id', proteger, productoController.eliminarProducto);

module.exports = router;
