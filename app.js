const express = require("express")
const mongoose = require("mongoose");
const  routes = require('./routes/auth.routes')
const  schools = require('./routes/schools.routes')
const  new_route = require('./routes/new.routes')
const  news_route = require('./routes/news.routes')
const  translation = require('./routes/translation.routes')
const champ_route = require("./routes/champ.routes")
const translation_parser = require("./translation_parser")
const news_parser = require("./news_parser")
const parser = require("./parser")
const app =  express()
const School_3 = require("./models/School_3")
const School_2 = require("./models/School_2")
const School = require("./models/School_3");
const path = require("path");
app.use(express.json({extended:true}))
app.use('/api/auth', routes)
app.use('/api/champ', champ_route)
app.use('/api/schools', schools)
app.use('/api/news', news_route)
app.use('/api/new', new_route)
app.use('/api/translation', translation)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Anastasia:12349876@cluster0.q9onq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        setInterval(async () => {
            await translation_parser.get_translation()
        },1800000)
        setInterval(async () => {
            await news_parser.get_news_1()
        },86400000)
        setInterval(async () => {
            await parser.parse()
        },86400000)

        app.listen(5000, async () => {
            console.log("App has been started")
        })
    }catch (e) {
        console.log(e)
    }
}

start()
