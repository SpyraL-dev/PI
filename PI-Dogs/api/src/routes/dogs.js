const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog } = require('../db');
const router = Router();
const axios = require("axios")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/" , async (req, res)=>{
    let dbDogs = await Dog.findAll()
    let dbDogsParse = []    
    for (let i = 0; i < dbDogs.length; i++) {
        let founddog = dbDogs[i];
        founddog = founddog.dataValues;
        dbDogsParse.push(founddog)
    }
    axios.get("https://api.thedogapi.com/v1/breeds") 
    .then(respuesta => {  
        dbDogsParse= [...dbDogsParse, ...respuesta.data]
        res.send(dbDogsParse)
    })
    .catch(error => {
        console.log(error)
    })
})
router.get("/CreatedDogs" , async (req, res)=>{
    let dbDogs = await Dog.findAll()
    let dbDogsParse = []    
    for (let i = 0; i < dbDogs.length; i++) {
        let founddog = dbDogs[i];
        let temperaments = await founddog.getTemperaments() 
        founddog = founddog.dataValues;
        temperaments = temperaments.map((el) => el.dataValues.name)
        founddog.temperament = temperaments.toString()
        dbDogsParse.push(founddog)
    }
    res.send(dbDogsParse)
})
router.get("/search" , async (req, res)=>{
    let dbDogs = await Dog.findAll()
    let dbDogsParse = []    
    for (let i = 0; i < dbDogs.length; i++) {
        let founddog = dbDogs[i];
        let temperaments = await founddog.getTemperaments() 
        founddog = founddog.dataValues;
        temperaments = temperaments.map((el) => el.dataValues.name)
        founddog.temperament = temperaments.toString()
        dbDogsParse.push(founddog)
    }
    axios.get(`https://api.thedogapi.com/v1/breeds`)
        .then(respuesta => {
            let resultado = [...dbDogsParse, ...respuesta.data].filter((el) => 
                el.name.toLowerCase().includes(req.query.name.toLowerCase()))
            if (resultado.length === 0) {
                res.send([])
            }
            if(resultado.length > 0 && resultado.length < 20) {
                res.send(resultado)
            }
            else if(resultado.length > 8) {
                let nuevoarray = resultado.slice(0, 20)
                res.send(nuevoarray)
            } 
            res.end()
        })        
        .catch(error => {
            console.log(error)

        })
})


router.get("/:id", async (req, res)=>{
    let dogdetails = []
  if(req.params.id.length>4) { 
    try{
    let searchdetails = await Dog.findByPk(req.params.id)
    let temperaments = await searchdetails.getTemperaments() 
    let found = searchdetails.dataValues;
    temperaments = temperaments.map((el) => el.dataValues.name)
    found.temperament = temperaments.toString()
    dogdetails.push(found)
    } catch(error) {
            console.log(error)
        }}
    axios.get(`https://api.thedogapi.com/v1/breeds`)
        .then (respuesta => {
            const perro = [...dogdetails, ...respuesta.data].find(element => element.id == req.params.id);
            res.send(perro)
        })
        .catch(error => {
            console.log(error)
        }) 
    })




router.post("/NewDog" , (req, res)=>{
    const {name, height, weight, temperaments} = req.body;
    Dog.create({
        name,
        height,
        weight,
        temperaments,
    })
    .then(doneTemp=>{
        res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send("error")})
})

module.exports = router;