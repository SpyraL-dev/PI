const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require('../db');
const router = Router();
const axios = require("axios")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/" , (req, res)=>{
    var apiDogs = axios.get("https://api.thedogapi.com/v1/breeds")
    var dbDogs =  Dog.findAll({
    })
    return Promise.all([
        apiDogs,
        dbDogs
    ])
    .then(resultados =>{
       los2= resultados[0].concat(resultados[1])
        res.send(los2)
    })
})
router.get("/raza?:name" , (req, res)=>{
    const {name}= req.params
    const sname = name
    var apiDogs = axios.get("https://api.thedogapi.com/v1/breeds")
    var dbDogs =  Dog.findAll({
    })
    return Promise.all([
        apiDogs,
        dbDogs
    ])
    .then(resultados =>{
      var los2= resultados[0].concat(resultados[1])
      var filtrado = los2.findAll({where:{name: sname}})
      if(filtrado.length() !== 0)return res.send(los2)
      else return res.send("Error raza de perro no encontrada")
    })
})
router.get("/:id", (req, res)=>{
    const {id} = req.params
    var sid= id
    var apiDogs = axios.get("https://api.thedogapi.com/v1/breeds").findAll({ where:{id: sid}})
    var dbDogs = Dog.findAll({ where:{id: sid}})
    if(apiDogs.length()>0){
        return res.json(apiDogs)
    };
    if(dbDogs.length() >0){
        return res.json(dbDogs)
    };
    return res.send("Error Id de Dog no encontrada")
})



router.post("/Dog" , (req, res)=>{
    const {name, height, weight, temperaments} = req.body;
    Dog.create({
        name,
        height,
        weight,
    })
    .then(doneTemp=>{
        doneTemp.setTemperaments(temperaments)
        res.json(doneTemp)
    })
    .catch(err=>{ res.send("error")})
})

module.exports = router;