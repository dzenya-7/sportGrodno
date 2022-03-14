import "./styles/Translation.css"

import React, {Component, useEffect, useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/Footer";


import {useHttp} from "../hooks/http.hook";
import * as url from "url";

const Translation = () => {
    const [rowsvalue,setRowsValue] = useState(1)
    const fut = ["https://www.zougla.gr/assets/images/1128427.jpg",
        "http://image001.yambs.net/20190813/9d69f7b07e612a8bdcd32cce9433155f.jpg.thumb.jpg",
        "http://yaltasoccer.ru/images/n2team.jpg",
        "https://1.bp.blogspot.com/-TgAXE9Sm-Ds/Wm-F2yCUZ5I/AAAAAAAACIw/-gDvvGNwrtc3oz6F7dAz8JmVN6-kcHHDACLcBGAs/s400/il-compleanno-di-gigi-buffon.jpg",
        "https://img.docbao.vn/images/site-1/20160627/nhung-khoanh-khac-messi-va-dong-doi-ngam-ngui-ve-nhi-tai-copa-america-2016-24-27062016140208.jpg",
       "https://www.siliconluxembourg.lu/wp-content/uploads/2021/06/waldemar-brandt-iiwYpGkbDgM-unsplash-400x300.jpg",
        "http://www.betsportsuk.com/wp-content/uploads/2015/01/soccer-20-400x300.jpg",
        "https://i.pinimg.com/736x/6a/c6/0f/6ac60fb6d312f052cbe95bb07c8df34d--football-soccer-football-players.jpg",
        "https://triboona.ru/uploads/posts/2018-06/152895806913a9cf740d1fe14691bd0ac5646dd54f6-400x300.jpeg",
        "https://www.oreanda.ru/aimg/80x16000/1274292/head_0.jpg",
        "https://images.daznservices.com/di/library/GOAL/b/4c/adidas-predator-18_1acm7v47lj3gg1vtb365am1t3m.jpg?w=400&h=300",
        "https://1.bp.blogspot.com/-DO5onttkxHc/V4QYhnyYdzI/AAAAAAAAATA/EGYRJVADe4wbuydKLgq0pgJDwdhbi4IEwCKgB/s400/800.jpg",
        "https://photoshop-land.3dn.ru/_nw/12/s21451129.jpg",
        "https://cdnmedia.thethaovanhoa.vn/2013/10/25/17/53/Ronaldo-Pique.jpg",
        "https://img.docbao.vn/images/site-1/20151103/khong-mua-ban-quyen-giai-ngoai-hang-anh-bang-moi-gia-25-03112015153434.jpg",
        "http://asbest-grin.ru/_nw/219/s57854983.jpg",
        "https://i.insider.com/5e012e23fb23d0539e1a3795?width=400",
        "https://2.bp.blogspot.com/-mzjh9tJZb04/WaiP0VAGz4I/AAAAAAAAHn0/l4xPuTwLtc8lRJaK9eYvd9VCZ1fGMkuXgCLcBGAs/s400/hqdefault.jpg",
        "https://www.hormozban.ir/wp-content/uploads/2019/12/79036947400.jpg",
        "https://sportky.zoznam.sk/cacheImg/obr/400px/euro-2020-lopta-euro-606877.jpg",
        "https://i0.wp.com/tornado-kiev.com/wp-content/uploads/2013/12/photodune-7717723-soccer-players-m.jpg?resize=400%2C300",
        "https://zoryanyy.tv/upload/iblock/734/734ede6e2fdad260624e8259188d6913.jpg",
        "http://1.bp.blogspot.com/-t8TlhWm4S_8/UBDq-TgVUmI/AAAAAAAAIJk/1ikKxAXo0iw/s400/Alex%2BMorgan%2Bwallpaper%2BUSA-France%2B2012%2Bsoccer.jpg",
        "https://4.bp.blogspot.com/-60q1qWzGxpA/WPzZS5HrMQI/AAAAAAAAAsY/xqCLpXTCvB8rQWKviDVqtVhPCGod7LnCACLcB/s400/barcelona-real-madrid.jpg",
        "https://www.yarcom.ru/sites/default/files/styles/400x300_crop/public/afisha/photo/2018/07/qlmQhTK-cMfjqqO.jpg.webp?itok=gqGY4eDY"
    ]
    const hoc = [
        "https://i.yaklass.by/res/3e7f6546-b589-40a6-8d5c-29351b6dcec3/photomedium.jpg",
        "https://sportky.zoznam.sk/cacheImg/obr/400px/washington-capitals-nhl-richard-592119.jpg",
        "http://cdn-st2.rtr-vesti.ru/p/b_1244961.jpg",
        "http://букмекеры.рф/images/media/sport/Hockey/NHL/Pittsburgh-Penguins/2017/pittsburg_pinguins_1.jpg",
        "https://www.oreanda.ru/aimg/77x16000/1223941/head_0.jpg",
        "https://probukmeker.ru/assets/gallery_thumbnails/80/80d8dcae355f251cc391c7e26895b2c2.jpg",
        "http://bogorodskoe43.ru/uploads/posts/2016-04/1461069687_devchonki.jpg",
        "https://content.tviz.tv/gfx/res/44317/2i0soh6yxq0w048cg4k4w80s0.jpg",
        "https://www.livekuban.ru/sites/default/files/upload/iblock/d31/d3121109d5eef1cc8fdf5d90eb271af4.jpg",
        "http://yeisk24.com/media/k2/items/cache/036ed0e6a3b405e0e41006186ff9376d_M.jpg",
        "http://fanat-sport.ru/wp-content/uploads/2021/04/cc346492ab2033d51f0f0de1223b8585.jpg",
        "https://nhliga.org/data/teams/photo/small/team_photo_5775_20200923105947.jpg",
        "https://img.championat.com/news/big/a/m/ovechkin-i-malkin-za-lokomotiv_13185881091260613325foto.jpg",
        "https://www.oreanda.ru/aimg/82x16000/1296235/head_0.jpg",
        "https://xakac.info/files/news/05/46/16.jpg",
        "https://img.championat.com/s/735x490/news/big/m/m/tank-belousova-protiv-komandy-zheleznogo-majka_1380180948614911473.jpg",
        "https://www.advocate.com/sites/default/files/2014/02/21/USA-Canada-Hockey-X400.jpg",
        "https://dasg7xwmldix6.cloudfront.net/episodes/144747_6nnJ5qTc.png",
        "http://tagilhockey.ru/wp-content/uploads/amerikancy-davjat-kanadcy-zabivajut_1.jpg",
        "https://www.kevinneeld.com/wp-content/uploads/2019/04/Skating-Speed-and-Rotational-Power-for-Hockey-400x300.jpg",
        "http://cdn-st4.rtr-vesti.ru/p/b_1476559.jpg",
        "http://fanat-sport.ru/wp-content/uploads/2021/01/b3fc6353f0c577fcf39a1d69e68cce95.jpg",
        "http://cdn-st3.rtr-vesti.ru/p/b_1314946.jpg",
        "http://tagilhockey.ru/wp-content/uploads/istoricheskoe-utro-dlja-ska-o-chem-v-jeto-den_1.jpg",
        "https://media-1obl-ru.storage.yandexcloud.net/iblock/564/nuhcow.jpg",
        "https://img.championat.com/s/735x490/news/big/v/x/bezzhalostnye-rejndzhery_1321085545296940716300.jpg",
        "https://i.skyrock.net/2658/23972658/pics/696792307_small.jpg",
        "https://cdn-st4.rtr-vesti.ru/p/b_1341323.jpg",
        "http://fanat-sport.ru/wp-content/uploads/2020/07/32ee8bed3f328579f59538d585bf6d8e.jpg",
        "http://static2.smi2.net/img/1200x630/6941411.jpeg",
        "https://pbs.twimg.com/media/DAW5nt9XkAQQLrA.jpg:large",
        "http://tagilhockey.ru/wp-content/uploads/itogi-vystuplenija-sbornoj-rossii-na-kubke-karjala_1.jpg"
    ]
    const bas = [
        "https://onorlighting.com/Uploads/image/20200803/20200803144108_23518.jpg",
        "https://i.ebayimg.com/images/g/vbwAAOxydlFS4m7A/s-l400.jpg",
        "https://i.ebayimg.com/images/g/A-kAAOSw0i9eeSPN/s-l400.jpg",
        "https://fadeawayworld.com/.image/t_share/MTc5ODU5OTk5OTgzODcxNTk5/derrick-rose-pic-getty-images-835672364-1424851209.jpg",
        "https://image.zb06.com/placeholder-images/lanqiu-11.png",
        "https://kapper1.ru/wp-content/uploads/look.com_.ua-28290.jpg",
        "https://penza-online.ru/upload/articles/2019/5d89d5c197b20.jpeg",
        "https://static.tildacdn.com/tild6364-6636-4636-a138-643766393534/50638a530e1e184ff4ee.jpg",
        "http://cdnimg.rg.ru/img/content/171/33/52/13p_basket_2k_150_d_850.jpg",
        "https://www.wallpaperflare.com/static/368/713/80/kobe-bryant-playing-basketball-wallpaper.jpg",
        "https://cdn.pixabay.com/photo/2016/07/26/02/18/basketball-1541837_1280.jpg",
        "https://get.wallhere.com/photo/jump-basketball-basket-struggle-players-749870.jpg",
        "https://resh.edu.ru/uploads/lesson_extract/3637/20190724152749/OEBPS/objects/m_ptls_4_31_1/5c6516918b141757fe1e8641.jpg",
        "http://clipart-library.com/images/kc858Bdqi.jpg",
        "https://kartinkin.net/uploads/posts/2021-07/1625663604_43-kartinkin-com-p-basketbol-oboi-krasivie-46.jpg",
        "https://www.yuga.ru/media/fa/38/fiba_russia-france_b28__dty84ck.jpg",
        "https://www.wallpaperup.com/uploads/wallpapers/2014/01/01/211272/b002347bad2d50a58389525489a5af66-1400.jpg",
        "https://supercoolpics.com/wp-content/uploads/2012/08/supercoolpics_04_12082012103422.jpg",
        "http://clipart-library.com/images/qiBozRALT.jpg",
        "https://cdn.pixabay.com/photo/2013/03/06/14/21/basketball-90904_1280.jpg",
        "https://img.bleacherreport.net/img/images/photos/001/837/472/hi-res-150195230_crop_exact.jpg?w=1200&h=1200&q=75",
        "https://i.pinimg.com/originals/e7/d1/bb/e7d1bbd9f24e1d8fdd3c4695f2b4e5ad.jpg",
        "https://i.pinimg.com/originals/e7/d1/bb/e7d1bbd9f24e1d8fdd3c4695f2b4e5ad.jpg",
        "https://pixnio.com/free-images/2017/07/22/2017-07-22-13-15-39.jpg",
        "https://media.baamboozle.com/uploads/images/17278/1562773115_143157",
        "https://prometey82.ru/static/media/1.aab224df.jpg",
        "https://s1.1zoom.ru/big7/230/Basketball_Sky_Ball_511179.jpg",
        "https://media.baamboozle.com/uploads/images/147897/1618836508_628008_url.jpeg",
        "https://cdn.vox-cdn.com/thumbor/wNBLwxssIbrijeRlh9_l09KG2E4=/0x88:2086x1479/1200x800/filters:focal(0x88:2086x1479)/cdn.vox-cdn.com/uploads/chorus_image/image/48952175/usa-today-9143073.0.jpg",
        "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fbustingbrackets.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F1212397608.jpeg"
    ]
    const ten = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]
    const back = "https://www.zougla.gr/assets/images/1128427.jpg"
    const {request} = useHttp()
    const [type,setType] = useState("bt5")
    const [list,setList] = useState([{url:"",title:""}])
    const [link,setLink] = useState("")
    const fetchAll = React.useCallback(async ()=>{
        try {
            let data = await request("/api/translation/"+type, 'GET')
            setList(data)
            if(link!==""){
                setUrl(data[0].url)
            }
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(
        ()=>{
            if(window.outerWidth<1000){
                setRowsValue(2)
            }
            else if(window.outerWidth>1900){
                setRowsValue(3)
            }
            else if(window.outerWidth>1400){
                setRowsValue(2)
            }
        },[window.outerWidth]
    )
    useEffect(()=>{
        const fetchData = async () => {
            if(type !== "bt5"){
                try{
                    if(list[0].url===""){
                        await fetchAll()
                    }
                }
               catch (e) {
                   console.log(e)
               }
            }
            else setLink("http://gipnomag.ru/playerjs/player1.html?file=https://ngtrk.dc.beltelecom.by/ngtrk/smil:belarus5.smil/playlist.m3u8")
        };
        fetchData();
    },[type,link])
    const set =async (sport) => {
        setList([{url:"",title:""}])
        await setType(sport)
    }
    const setUrl =async (source) => {
        await setLink(source)
    }
    return (
        <div>
            <div className="main_transl">
                <h2 className="h2_t">Прямая трансляция</h2>
                <div className="cont1">
                    <div className="left">
                        <div className="sport_2">
                            <button style={type==="bt5"?{color:'red'}:{}} onClick={()=>{set("bt5");setUrl("")}}>Беларусь 5</button>
                            <button style={type==="football"?{color:'red'}:{}} onClick={()=>{set("football");setUrl("")}} >Футбол</button>
                            <button style={type==="hockey"?{color:'red'}:{}} onClick={()=>{set("hockey");setUrl("")}} >Хоккей</button>
                            <button style={type==="basketball"?{color:'red'}:{}} onClick={()=>{set("basketball");setUrl("")}} >Баскетбол</button>
                            <button style={type==="tennis"?{color:'red'}:{}} onClick={()=>{set("tennis");setUrl("")}} >Теннис</button>
                        </div>
                    </div>
                    <div >
                        <div className="right_2">
                            {
                                link===""?
                                    <div></div>
                                    :
                                    <div className="videoContainer">
                                        {
                                            <iframe
                                                className="frame"
                                                    src={link}
                                                    width="500px"
                                                    height="500px"
                                                    frameBorder="0" allow="autoplay" scrolling="no" allowFullScreen="true"/>
                                        }
                                    </div>
                            }
                            <ul className="news__list_4">
                                {
                                    type==="bt5"?
                                        <li>
                                        </li>
                                        :
                                        list.length === 0?
                                            <li>
                                                <p className="h2_p">В данный момент на выбранный вид спорта трансляций нет</p>
                                            </li>
                                            :list.map(item => (
                                                <li className="li5_" key={item._id}>
                                                    <div className="con" onClick={()=>{
                                                        setUrl(item.url)
                                                    }}
                                                         style={{
                                                             background: `url(${type==="football"?fut[list.indexOf(item)]:type==="hockey"?hoc[list.indexOf(item)]:type==="basketball"?bas[list.indexOf(item)]:ten[list.indexOf(item)]})`}}
                                                    >
                                                        <p style={link===item.url?{color:"red"}:{}} >{item.title.split(":")[0]}</p>
                                                        <p style={link===item.url?{color:"red"}:{}}>{item.title.split(":")[1]}</p>
                                                    </div>
                                                </li>
                                            ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Translation;

