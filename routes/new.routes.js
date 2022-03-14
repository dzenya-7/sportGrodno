const {Router} = require('express')
const Football = require("../models/Football")
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const router = Router()

router.get('/football/:page',async (req,res)=>{
    try {
        let str ="«Господь положил руки к моей голове». Гол вратаря сохранил для «Ливерпуля» шансы на ЛЧ"
        let list = await Football.find().sort({'date': 1}).limit(10).skip((req.params.page-1)*10)
        let count = await Football.find().count()
        let was = await Football.findOne({title:str})
        let i=!!was
        console.log(i)
        console.log(count)
        return res.json(list)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/football/id/:id',async (req,res)=>{
    console.log(req.params.id)
    try {
        let id = mongoose.Types.ObjectId(req.params.id.trim())
        console.log("id="+ id)
        let count = await Football.find({'_id':id})
        console.log(count)
        return res.json(count)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.post('/football/update/id/:id',async (req,res)=>{
    console.log("Update")
    try {
        console.log(req.body)
        const {img,id,text,title} = req.body
        console.log(img)
        console.log(text)
        console.log(title)
        console.log(id)
        let was = await Football.updateOne({'_id':id},{$set: {img : img,text:text,title: title}})
        console.log(was)
        if(was){
            res.status(201).json({message: "Новость обновлена"})
        }
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.post('/football/delete/:id',async (req,res)=>{
    console.log("Delete")
    try {
        const id = req.params.id
        console.log(id)
        let was = await Football.deleteOne({'_id':id})
        console.log(was)
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
router.get('/football',async (req,res)=>{
    try {
        let news = await Football.find()
        return res.json(news)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/f',async (req,res)=>{
    try {
        let news = await Football.find().count()
        return res.json(news)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/count',async (req,res)=>{
    try {
        let news = await Football.find().distinct("author")
        console.log("Count")
        return res.json(news)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})
router.get('/:author/:page',async (req,res)=>{
    try {
        console.log("Author")
        console.log(req.params.author)
        console.log(req.params.page)
        let news = await Football.find({"author":req.params.author}).sort({'date': -1}).limit(10).skip((req.params.page-1)*10)
        console.log("Author")
        return res.json(news)
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({ message: e.message })
    }
})


module.exports = router