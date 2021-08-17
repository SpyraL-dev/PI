const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Temperament } = require('../db');
const axios = require("axios")
const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/" , async (req, res)=>{
    try{
    let searchtemperaments = await Temperament.findAll()
    searchtemperaments = JSON.stringify(searchtemperaments, null, 2) 
    searchtemperaments = JSON.parse(searchtemperaments)
    if(searchtemperaments.length !== 0) {
        res.send(searchtemperaments) 
    } else {
     axios.get("https://api.thedogapi.com/v1/breeds") 
     .then(async respuesta => {
         let foundtemperaments = []
         let temperaments2 = respuesta.data.map((el) => el.temperament) 
         let newtemperaments = temperaments2.map((el) => el && el.split(",")).flat()
         newtemperaments.forEach((el) => {
             if(foundtemperaments.indexOf(el) < 0) foundtemperaments.push(el)
         })
         for (let i = 0; i < 20; i++) {
             await Temperament.create({
                 name: foundtemperaments[i]
             }) 
         }
         res.send(foundtemperaments.slice(0,20))
     }) 
     .catch(error => {
         console.log(error)
     })           
    }
} catch(error){
    return (console.log(error))
}
})
router.post("/NewTemperament" , async (req, res)=>{
    console.log(req.body)
    Temperament.create({
        name: req.body.name
      })
        .then((temperament) =>{
          res.send(temperament.dataValues)
        } )
        .catch((error) => res.status(400).send(error));
    })
  

module.exports = router;