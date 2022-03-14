const puppeteer = require("puppeteer")
const News = require("./models/News")
const mongoose = require("mongoose");
const {TimeoutError} = require("puppeteer");
let browser
async function get_news_1(){
    try {
        console.time('Watcher');
        await mongoose.connect('mongodb+srv://Anastasia:12349876@cluster0.q9onq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        browser = await puppeteer.launch({
            headless:false,
            slowMo:100
        })
        //await News.deleteMany()
        let counter = 2
        let page = await browser.newPage()
        await  page.setDefaultNavigationTimeout(0)
        await page.goto("https://sputnik.by/geoBelarus+sport/")
        const m = await page.$$eval(
            "#content > div > div > div.content > div.caption > div.rubric__controls > div.counter.m-visible", postLinks => postLinks.map(link => link.textContent)
        );
        console.log(counter)
        console.log(typeof counter)
        console.log("MMM")
        let button = await page.$("div.list__more")
        await button.click()
        for (let i =0;i<counter;i++){
            await page.evaluate(() => {
                document.querySelector('div.list__more').scrollIntoView();
            });
            console.log(i)
        }
        const postUrls = await page.$$eval(
            "div.list__content > a", postLinks => postLinks.map(link => link.href)
        );
        let users= []
        console.log(postUrls.length)
        console.timeEnd('Watcher');
        console.time("Page")
        postUrls.reverse()
        for(let index in postUrls){
            if(index>0){
                let url = postUrls[index]
                await page.goto(url)
                //console.log(postUrls.length)
                try {

                    if( await page.waitForSelector("#endless > div.endless__item.m-active > div > div > div.article > div.article__header > div.article__announce > div > div.media__size > div > img",{timeout:1000})!==null)
                    {
                        const images = await page.$$eval(
                            "#endless > div.endless__item.m-active > div > div > div.article > div.article__header > div.article__announce > div > div.media__size > div > img", postLinks => postLinks.map(link => link.src)
                        );
                        const titles = await page.$$eval(
                            "#endless > div.endless__item.m-active > div > div > div.article > div.article__header > h1", postLinks => postLinks.map(link => link.textContent.toString())
                        );
                        const texts = await page.$$eval(
                            "#endless > div.endless__item.m-active > div > div > div.article > div.article__body > div", texts => texts.map(text => text.textContent.toString())
                        );
                        texts[0] = texts[0].split("Sputnik. ")[1]
                        let txt = []
                        let ind = texts.indexOf(">>> Хотите еще больше актуальных и интересных новостей – подписывайтесь на Telegram-канал Sputnik Беларусь")
                        let ind_2 = texts.indexOf(">>> Самая актуальная информация о переговорах России и Украины – в Telegram-канале Sputnik Беларусь")

                        if(ind>0 || ind_2>0){
                            if(ind>0){
                                for(let i = 0;i<ind;i++){
                                    txt.push(texts[i])
                                }
                            }
                            else{
                                for(let i = 0;i<ind_2;i++){
                                    txt.push(texts[i])
                                }
                            }

                        }
                        else{
                            txt = texts
                        }
                        console.log(txt)
                        const F = new News({
                            text: txt,
                            title:titles[0],
                            img:images[0],
                        })
                        let was = await News.findOne({title:titles[0]})
                        let i=!!was
                        if(i){
                            console.log("This object there is in DB: " + index)
                        }
                        else{
                            console.log(index)
                            console.log("Inserted")
                            console.log(F)
                            users.push(F)
                            await F.save()
                        }
                    }
                }
                catch (e) {
                    console.log(e)
                    continue
                }
            }
        }
        console.timeEnd("Page")
    }
    catch (e) {
        console.log(e)
    }
}
get_news_1()

module.exports.get_news_1 = get_news_1


