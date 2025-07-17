const Producto = require('../models/Producto');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      cantidad,
      usuario: req.usuario._id, // ID del usuario autenticado
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto.', error });
  }
};

// Obtener todos los productos del usuario autenticado
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ usuario: req.usuario._id });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos.', error });
  }
};

// Obtener un solo producto
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findOne({
      _id: req.params.id,
      usuario: req.usuario._id,
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar producto.', error });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario._id },
      req.body,
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto.', error });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuario._id,
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto.', error });
  }
};
