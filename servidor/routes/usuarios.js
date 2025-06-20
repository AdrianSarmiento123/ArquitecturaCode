const express = require('express');
const router = express.Router();
const { usuarios } = require("../models");
const jwt = require("jsonwebtoken");

// API GET
router.get("/", async (req, res) => {
    const listaUsuarios = await usuarios.findAll()
    res.json(listaUsuarios)
});

// API POST
router.post("/", async (req, res) => {
    const usuario = req.body;
    await usuarios.create(usuario)
    res.json(usuario)

})

router.post("/register", async (req, res) => {
    // 1. OBTENER CAMPOS (SIN 'role', ya que no viene del frontend)
    const { nombre, identidad, correo, password, especialidad } = req.body; // Quitamos 'role' de aquí

    // 2. VALIDAR CAMPOS REQUERIDOS (SIN 'role', porque lo asignaremos por defecto)
    //    Ajusta !especialidad si es opcional. Quitamos !bio también.
    if (!nombre || !identidad || !correo || !password ) {
        // Mensaje de error más preciso
        return res.status(400).json({ error: "Faltan campos requeridos (nombre, apellido, correo, contraseña)." });
    }

    // 3. YA NO es necesaria la validación del valor de 'role' aquí, porque no viene del request.

    try {
        // 4. CREAR USUARIO asignando el rol por defecto
        const newUser = await usuarios.create({
            nombre,
            apellido: "Entidad",
            identidad,
            correo,
            password,       // El hook hashea esto
            role: "entidad", // <-- ASIGNAR ROL POR DEFECTO DIRECTAMENTE
            especialidad,   // Este puede ser null si el modelo lo permite y no se envía
            // bio: bio       // <-- Añade solo si tienes campo 'bio' y lo recibes
        });

        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);

    } catch (error) {
        console.error("Error creating user:", error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: "El correo electrónico ya está registrado." });
        }
        if (error.name === 'SequelizeValidationError') {
             return res.status(400).json({ error: "Datos inválidos.", details: error.errors.map(e => e.message) });
        }
        res.status(500).json({ error: "Ocurrió un error interno al crear el usuario." });
    }
});

router.post("/register/usuario", async (req, res) => {
    // 1. OBTENER CAMPOS (SIN especialidad, SIN role)
    const { nombre, apellido, correo, password } = req.body; // Solo los campos básicos

    // 2. VALIDAR CAMPOS REQUERIDOS para un Cliente
    if (!nombre || !apellido || !correo || !password) {
        return res.status(400).json({ error: "Faltan campos requeridos (nombre, apellido, correo, contraseña)." });
    }

    // 3. No necesitamos validar 'role' porque lo asignaremos fijo.

    try {
        // 4. CREAR USUARIO asignando el rol 'cliente' y SIN especialidad
        const newUser = await usuarios.create({
            nombre,
            apellido,
            identidad:0,
            correo,
            password,           // El hook hashea esto
            role: "usuario",   // <-- ROL ASIGNADO A CLIENTE
            // especialidad: null // No es necesario pasarlo si es nullable en el modelo
            // bio: bio           // <-- Añade si tienes campo 'bio' y lo recibes
        });

        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);

    } catch (error) {
        console.error("Error creating client user:", error); // Mensaje de log específico

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: "El correo electrónico ya está registrado." });
        }
        if (error.name === 'SequelizeValidationError') {
             return res.status(400).json({ error: "Datos inválidos.", details: error.errors.map(e => e.message) });
        }
        res.status(500).json({ error: "Ocurrió un error interno al crear el usuario cliente." }); // Mensaje específico
    }
});

// Login - autenticación de usuario
router.post("/login", async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos." });
    }

    try {
        const user = await usuarios.findOne({ where: { correo } });

        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado." });
        }

        const isPasswordValid = await user.validPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                correo: user.correo,
                nombre: user.nombre,
            },
            "clave_secreta_123", //Reemplaza esto con una clave secreta más segura (usa .env en producción)
            { expiresIn: "1d" }
        );

        const userData = user.toJSON();
        delete userData.password;

        res.json({ mensaje: "Login exitoso", token, user: userData });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el servidor al hacer login." });
    }
});
module.exports = router;