const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require('../db');
const router = Router();
const axios = require("axios")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/" , (req, res)=>{
    return  Dog.findAll({
        include: Temperament
    })
    .then((temp)=>{
       return res.json(temp)
    })
})
router.get("/all" , (req, res)=>{
    var apiDogs = axios.get("https://api.thedogapi.com/v1/breeds")
    var dbDogs =  Dog.findAll({
        include: Temperament
    })
    return Promise.all([
        apiDogs,
        dbDogs
    ])
    .then(resultados =>{
        console.log(resultados[0].data)
        res.send("listo")
    })
})
router.post("/" , (req, res)=>{
    const {name, height, weight} = req.body;
    Dog.create({
        name,
        height,
        weight,
    })
    .then(doneTemp=>{
        res.json(doneTemp)
    })
    .catch(err=>{ res.send("error")})
})

module.exports = router;