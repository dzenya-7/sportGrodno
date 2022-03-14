const puppeteer = require("puppeteer")
const Translation = require("./models/translation")
const mongoose = require("mongoose");
let browser
async function get_translation(){
    try {
        await mongoose.connect('mongodb+srv://Anastasia:12349876@cluster0.q9onq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        browser = await puppeteer.launch({
            headless:false,
            slowMo:100
        })
        await Translation.deleteMany()
        let counter = 5
        let page = await browser.newPage()
        let sports = ["Футбол", "Хоккей", "Баскетбол","Теннис"]
        await  page.setDefaultNavigationTimeout(0)
        for (let ind in sports){
            await page.goto("http://livetv516.me/allupcomingsports/" + (parseInt(ind)+1) + "/")
            try {
                await page.waitForSelector("body > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(3)"
                    + " > tbody > tr > td:nth-child(2) > table > tbody> tr > td > table > tbody > tr > td  ",{timeout:1000})
                const postUrls = await page.$$eval(
        "body > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2)", postLinks => postLinks.map(link => link.innerHTML)
                );
                //console.log(postUrls)
                let arr = []
                for(let url in postUrls){
                    if(postUrls[url].includes("img")){
                        let src ="http://livetv516.me" + postUrls[url].split('"')[3]
                        let title = postUrls[url].split('>')[1].split("<")[0] + ": " + postUrls[url].split('>')[7].split(")")[0].split("(")[1]
                        let d = new Translation({
                            url:src, title:title,sport:sports[ind]
                        })
                        if(!arr.some(e => e.url === src)){
                            arr.push(d)
                        }
                    }
                }
                for(let obj of arr){
                        await page.goto(obj.url)
                        try {
                            await page.waitForSelector("#links_block > table:nth-child(2) > tbody" +
                                " > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(6)>a",{timeout:1000})
                            const postUrls = await page.$$eval(
                                "#links_block > table:nth-child(2) > tbody" +
                                " > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(6)>a", postLinks => postLinks.map(link => link.href)
                            );
                            for (let src of postUrls){
                                await page.goto(src)
                                const postUrls = await page.$$eval(
                                    "#playerblock > tbody > tr > td > iframe", postLinks => postLinks.map(link => link.src)
                                );
                                obj.url = postUrls[0]
                                console.log(postUrls[0])
                            }
                        }
                        catch (e) {
                            console.log("1" + e)
                        }

                }
                console.log(arr)
                for(let obj of arr){
                        console.log(arr.indexOf(obj) + " : " + obj)
                        console.log(12)
                        if(obj.url !== undefined){
                            if(!obj.url.includes("livetv")){
                                await obj.save()
                            }
                        }
                }
            }
            catch (e) {
                console.log("2" + e)
            }

        }
        console.log("Done!!!!!")
    }
    catch (e) {
        console.log(e)
    }
}


get_translation()

module.exports.get_translation = get_translation


