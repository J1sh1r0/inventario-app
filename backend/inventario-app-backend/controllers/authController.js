const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar token JWT
const generarToken = (usuarioId) => {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Registro
exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();

    const token = generarToken(nuevoUsuario._id);
    res.status(201).json({
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario.', error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValida = await usuario.compararContraseña(contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    const token = generarToken(usuario._id);
    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error });
  }
};
