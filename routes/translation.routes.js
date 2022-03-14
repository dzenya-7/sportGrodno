const {Router} = require('express')
const Translation = require("../models/translation");
const router = Router()


router.get('/',async (req,res)=>{
    try {
        let list = await Translation.find()
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})

router.get('/football',async (req,res)=>{
    try {
        let list = await Translation.find({sport:"Футбол"})
        console.log(1)
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/hockey',async (req,res)=>{
    try {
        let list = await Translation.find({sport:"Хоккей"})
        console.log(2)
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/basketball',async (req,res)=>{
    try {
        let list = await Translation.find({sport:"Баскетбол"})
        console.log(3)
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/tennis',async (req,res)=>{
    try {
        let list = await Translation.find({sport:"Теннис"})
        console.log(4)
        return res.json(list)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})

module.exports = router