const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Temperament } = require('../db');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/" , async (req, res)=>{
    try {
   const temper = await Temperament.findAll()
   return res.json(temper)
    }catch(err){console.log(err)}
})
router.post("/" , async (req, res)=>{
    const {name} = req.body;
    try{
    const temper = await Temperament.create({
        name,
    })
   return res.json(temper)
}catch(err){
    console.log(err)
}
})

module.exports = router;