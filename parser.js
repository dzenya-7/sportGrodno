const puppeteer = require("puppeteer")
let now = require("performance-now")
let express = require('express')
const Football = require('./models/Football')
const School = require('./models/School_2')
const mongoose = require("mongoose");
let page
let browser
const prepare = async () => {
    await mongoose.connect('mongodb+srv://Anastasia:12349876@cluster0.q9onq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

async function parser_1(reverse,limit) {
    try{
        let id = 1
        counter = 0
        let sports = await School.find({"id":(id).toString()})
        console.log(sports)
        let links = []
        let images = []
        let titles = []

        await Football.deleteMany({"author":1})
        while (counter<4){
            let flink=`http://grodno-dinamo.by/o-bfso-dinamo/novosti/novosti-3?start=${16*counter}`
            await page.goto(flink)
            if(await page.waitForSelector("#leo-blockbottom") !==null){
                const postUrls = await page.$$eval(
                    "div.catItemHeader > h3 > a", postLinks => postLinks.map(link => link.href)
                );
                for (let i in postUrls){
                    links.push(postUrls[i])
                }
                const imags = await page.$$eval(
                    "div.catItemImageBlock > span > a > img", postLinks => postLinks.map(link => link.src)
                );
                for (let i in imags){
                    images.push(imags[i])
                }
                const titls = await page.$$eval(
                    "div.catItemHeader > h3 > a", postLinks => postLinks.map(link => link.textContent.toString())
                );
                for (let i in titls){
                    titles.push(titls[i])
                }
            }
            counter++
        }
        if(!!reverse){
            images.reverse()
            links.reverse()
            titles.reverse()
        }
        for (let url of links){
            let index = links.indexOf(url)
            await page.goto(url)
            if(await  page.waitForSelector("#leo-blockbottom")!==null){
                let texts_2 = await page.$$eval(
                    "div.itemFullText" , postLinks => postLinks.map(link => link.textContent.toString())
                );
                let txt2 = texts_2.join("\n")
                let texts = await page.$$eval(
                    "div.itemBody > div.itemIntroText"  , postLinks => postLinks.map(link => link.textContent.toString())
                );
                let txt = texts.join("\n")


                let img = await page.$$eval(
                    "#k2Container > div.k2ItemFull > div.itemImageBlock > span > a > img"  , postLinks => postLinks.map(link => link.src)
                );
                console.log(img)

                let text = txt + "\n" + txt2
                const F = new Football({
                    text:text,
                    title:titles[index],
                    img: img[0],
                    sport: sports[0].sports,
                    author: id
                })

                let was =await Football.findOne({title:titles[index]})
                console.log(titles[index])
                let i = !!was
                if(i){
                    console.log(index)
                    console.log("This object is in DB")

                }
                else {
                    console.log(F)
                    console.log("Insert")
                   await  F.save()
                }
            }
        }

    }
    catch (e){
        console.log(e)
        await browser.close()
    }
}

async function parser_2(reverse,limit) {
    try{
        let limit = 17
        let id=2
        counter = 1
        let sports = await School.find({"id":(id).toString()})
        let links = []
        let images = []
        let titles = []
        await Football.deleteMany({"author":2})
        while (counter<limit){
            let flink=`https://www.fcneman.by/press-centr/novosti/tag/СДЮШОР/page${counter}.html`
            await page.goto(flink)
            if(await page.waitForSelector("#pager") !==null){
                const postUrls = await page.$$eval(
                    "div.descr > h3 > a", postLinks => postLinks.map(link => link.href)
                );
                for (let i in postUrls){
                    links.push(postUrls[i])
                }
                const imags = await page.$$eval(
                    "div.img > a > img", postLinks => postLinks.map(link => link.src)
                );
                for (let i in imags){
                    images.push(imags[i])
                }
                const titls = await page.$$eval(
                    "div.descr > h3 > a", postLinks => postLinks.map(link => link.textContent.toString())
                );
                for (let i in titls){
                    titles.push(titls[i])
                }
            }
            counter++
        }
        if(!!reverse){
            images.reverse()
            links.reverse()
            titles.reverse()
        }
        for (let url of links){
            let index = links.indexOf(url)
            await page.goto(url)
            if(await  page.waitForSelector("#over-bg > footer")!==null){
                let texts_2 = await page.$$eval(
                    "div.txt > p " , postLinks => postLinks.map(link => link.textContent.toString())
                );
                let img

                try {
                    await  page.waitForSelector("#main-wrap > div > div > div.txt > p:nth-child(2) > img ",{timeout:1000})
                    img = await page.$$eval(
                        "#main-wrap > div > div > div.txt > p:nth-child(2) > img " , postLinks => postLinks.map(link => link.src)
                    );
                    img = img[0]
                }
                catch (e) {
                    img = "https://pbs.twimg.com/media/EVoetTfUcAA74ad.jpg"
                }
                console.log("img["+ index +"] = " + img)
                let text = texts_2.join("\n")
                const F = new Football({
                    text:text,
                    title:titles[index],
                    img: img,
                    sport: sports[0].sports,
                    author: id
                })
                await  F.save()
                let was =await Football.findOne({title:titles[index]})
                let i = !!was
                if(i){
                    console.log("This object is in DB")
                }
                else {

                }
            }
        }

    }
    catch (e){
        console.log(e)
        await browser.close()
    }
}

async function parser_3(reverse,limit) {
    try{
        let limit = 21
        let id=3
        counter = 1
        let sports = await School.find({"id":(id).toString()})
        let links = []
        let images = []
        let titles = []


        await Football.deleteMany({"author":3})
        while (counter<limit){
            let flink=`https://prinemanie.by/sdyushor/page/${counter}`
            await page.goto(flink)
            if(await page.waitForSelector("div.col-md-10.col-lg-7") !==null){
                const postUrls = await page.$$eval(
                    "div.col-lg-5.col-md-10.col-10.d-flex > div > a", postLinks => postLinks.map(link => link.href)
                );
                for (let i in postUrls){
                    links.push(postUrls[i])
                }
                const imags = await page.$$eval(
                    "div.news-img > img", postLinks => postLinks.map(link => link.src)
                );
                for (let i in imags){
                    images.push(imags[i])
                }
                const titls = await page.$$eval(
                    "div.news-info > div > h2", postLinks => postLinks.map(link => link.textContent.toString())
                );
                for (let i in titls){
                    titles.push(titls[i])
                }
            }
            counter++
        }
        if(!!reverse){
            images.reverse()
            links.reverse()
            titles.reverse()
        }
        for (let url of links){
            let index = links.indexOf(url)
            await page.goto(url)
            if(await  page.waitForSelector("#contact > section")!==null){
                let texts_2 = await page.$$eval(
                    "div.single-news__desc > p" , postLinks => postLinks.map(link => link.textContent.toString())
                );

                let text = texts_2.join("\n")

                const F = new Football({
                    text:text,
                    title:titles[index],
                    img: images[index],
                    sport: sports[0].sports,
                    author: id
                })

                let was =await Football.findOne({title:titles[index]})
                let i = !!was
                if(i){
                    console.log(index)
                    console.log("This object is in DB")

                }
                else {
                    await  F.save()
                }
            }
        }

    }
    catch (e){
        console.log(e)
        await browser.close()
    }
}

async function parser_4(reverse,limit) {
    try{
        let limit = 2
        let id=4
        counter = 1
        let sports = await School.find({"id":(id).toString()})
        let links = []
        let images = []
        let titles = []
        let texts = []
        await Football.deleteMany({"author":id})
        while (counter<limit){
            let flink=`https://icepalace.by/news.html`
            await page.goto(flink)
            if(await page.waitForSelector("#top > div.shadow.rolling-bg > div > div") !==null){
                const postUrls = await page.$$eval(
                    "#top > div.shadow.rolling-bg > div > div > a", postLinks => postLinks.map(link => link.href)
                );
                for (let i in postUrls){
                    links.push(postUrls[i])
                }
                const imags = await page.$$eval(
                    "#top > div.shadow.rolling-bg > div > div > a > div > div.item > div.image-window.shadow3 > div", postLinks => postLinks.map(link => link.outerHTML)
                );
                texts = await page.$$eval(
                    "#top > div.shadow.rolling-bg > div > div > a > div > div.item", postLinks => postLinks.map(link => link.textContent.toString())
                );
                for (let i in imags){
                    let l = imags[i].split("(")[1]
                    let m = l.split(")")[0]
                    console.log(m)
                    l = m.split("'")[1]
                    imags[i] = "https://icepalace.by/" + l
                }
                for (let i in imags){
                    images.push(imags[i])
                }
                const titls = await page.$$eval(
                    "#top > div.shadow.rolling-bg > div > div > a > div > div.title.shadow4 > h5", postLinks => postLinks.map(link => link.textContent.toString())
                );
                for (let i in titls){
                    titles.push(titls[i])
                }
            }
            counter++
        }
        if(!!reverse){
            images.reverse()
            links.reverse()
            texts.reverse()
            titles.reverse()
        }
        for (let url of links){
            let index = links.indexOf(url)
            console.log(index + " : " + texts[index])
            const F = new Football({
                text:texts[index],
                title:titles[index],
                img: images[index],
                sport: sports[0].sports,
                author: id
            })
            let was =await Football.findOne({title:titles[index]})
            let i = !!was
            if(i){
                console.log("This object is in DB")
            }
            else {
                console.log(F)
                await  F.save()
            }
        }
    }
    catch (e){
        console.log(e)
        await browser.close()
    }
}


async function get_info() {
    let counter = 1
    try {
        browser = await puppeteer.launch({
            headless:false,
            devtools:false
        })
        page = await browser.newPage()
    }
    catch (e){
        console.log(e)
        await browser.close()
    }
    prepare()
    await parser_1(true, 1)
    await parser_2(true, 1)
    await parser_3(true, 1)
    await parser_4(true, 1)
    //await  parser()
    console.log("Done")
}



async function parse() {
    await get_info()
}

get_info()
//get_info()
module.exports.parse = parse




