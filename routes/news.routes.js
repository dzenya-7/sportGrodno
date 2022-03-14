const {Router} = require('express')
const News = require("../models/News")
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const router = Router()

router.get("/lastNews",async (req,res)=>{
    try{

        let list = await News.find().sort({'date': -1}).limit(4)
        return res.json(list)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
router.get("/:page",async (req,res)=>{
    try{
        let list = await News.find().sort({'_id': -1}).limit(10).skip((req.params.page-1)*10)
        let count = await News.find().count()
        return res.json(list)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/update/:id',async(req,res) => {
    console.log("Update")
    try {
        console.log(req.body)
        const {img,id,text,title} = req.body
        console.log(img)
        console.log(text)
        console.log(title)
        console.log(id)
        let was = await News.updateOne({'_id':id},{$set: {img : img,text:text,title: title}})
        console.log(was)
        if(was){
            res.status(201).json({message: "Новость обновлена"})
        }
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/delete/:id',async (req,res)=>{
    console.log("Delete")
    try {
        let id = mongoose.Types.ObjectId(req.params.id.trim())
        console.log(id)
        let was = await News.deleteOne({'_id':id})
        console.log(was)
        console.log("123")
        if(was){
            res.status(201).json({message: "Новость удалена"})
        }
        else {
            res.status(500).json({message:"Новость не была удалена"})
        }
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/id/:id',async(req,res) => {

    let id = mongoose.Types.ObjectId(req.params.id.trim())
    let count = await News.find({'_id':id})
    console.log(count)
    return res.json(count)
})

module.exports = router