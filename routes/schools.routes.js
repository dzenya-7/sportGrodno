const {Router} = require('express')
const School = require("../models/School_3")
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const Football = require("../models/Football");
const {body} = require("express-validator");
const router = Router()

router.get('/',async (req,res)=>{
    try {
        console.log("/")
        let list = await School.find()
        let count = await School.find().count()
        console.log(count)
        return res.json(list)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/:id',async (req,res)=>{
    console.log(req.params.id)
    try {
        let count = await School.find({'id':req.params.id})
        console.log(count)
        return res.json(count)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/add',async (req,res)=>{
    try {
        console.log("add")
        let id = req.body.id
        console.log(req.body)
        let candidate = School.find({id})
        console.log(!candidate)
        if(!candidate){
            return res.status(400).json({ message: 'Такая школа уже существует' })
        }
        const school = new School({text:req.body.text,title:req.body.title,
            sports:req.body.sports,img:req.body.img,id:id})
        console.log(school)
        await school.save()
        return res.status(200).json("Hello")

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/item/count/',async (req,res)=>{
    try {
        console.log("Count")
        let count = await School.find().count()
        console.log(count)
        return res.json(count)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/items',async (req,res)=>{
    try {
        let list = req.body.arr
        console.log("list")
        console.log(list)
        console.log("list")
        let arr = new Array()
        for(let item in list) {
            let s =await School.find({'id':list[item]})
            let o = {
                id: list[item],
                text: s[0].text
            }
            arr.push(o)
        }
        console.log(arr)
        return res.json(arr)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/update/:id',async (req,res)=>{
    console.log("Update")
    try {
        console.log(req.body)
        const {img,id,text,title,photos} = req.body
        console.log(photos)
        let was = await School.updateOne({'_id':id},{$set: {img : img,text:text,title: title,photos: photos}})
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
module.exports = router
