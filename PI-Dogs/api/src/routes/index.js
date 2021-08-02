const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogroutes= require("./dogs")
const temproutes = require("./temperamnts")

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/Dogs" , dogroutes)
router.use("/Temperaments" , temproutes)

module.exports = router;
