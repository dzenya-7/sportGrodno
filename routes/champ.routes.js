const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Champions = require('../models/Champions')
const {check, validationResult} = require('express-validator')
const School = require("../models/School");
const router = Router()

router.get('/:id',async (req,res)=>{
    try {
        let id = req.params.id
        console.log(id)
        let list = await Champions.find({type:id})
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
module.exports = router

