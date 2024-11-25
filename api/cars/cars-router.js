const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req,res,next) => {
    try{
        const cars= await Car.getAll()
        res.json(cars)
    } catch (err){
        next(err)
    }
})

router.get('/:id', checkCarId, (req,res,next) => {
        res.json(req.car)
})

router.post(
    '/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
     async( req, res, next) => {
    try {
        const car = await Car.create(req.body)
        res.json(car)
    } catch(err) {
        next(err)
    }
})

module.exports = router
