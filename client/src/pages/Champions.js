import "./styles/Champions.css"
import React, {Component, useContext, useEffect, useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import {useHttp} from "../hooks/http.hook";
import {Link, NavLink} from "react-router-dom";


const Champions = () => {
    const links = [
        {
            name:"САПЕГА Юрий",
            link:"https://ru.wikipedia.org/wiki/Сапега,_Юрий_Николаевич"
        },
        {
            name:"ТИХОН Иван",
            link:"https://ru.wikipedia.org/wiki/Тихон,_Иван_Григорьевич"
        },
        {
            name:"ПОЧИНЧУК Петр",
            link:"https://ru.wikipedia.org/wiki/Поченчук,_Пётр_Иванович"
        },
        {
            name:"ЛАПИЦКИЙ Владимир",
            link:"https://ru.wikipedia.org/wiki/Лапицкий,_Владимир_Михайлович"
        },
        {
            name:"СТАПКОВИЧ Игорь",
            link:"https://ru.wikipedia.org/wiki/Астапкович,_Игорь_Вячеславович"
        },
        {
            name:"ДУБРОВЩИК Владимир",
            link:"https://ru.wikipedia.org/wiki/Дубровщик,_Владимир_Владимирович"
        },
        {
            name:"ПАВЛОВ Александр",
            link:"https://ru.wikipedia.org/wiki/Павлов,_Александр_Валерьевич_(борец)"
        },{
            name:"Басинский Игорь",
            link:"https://ru.wikipedia.org/wiki/Басинский,_Игорь_Михайлович"
        },
        {
            name:"ИВЧЕНКО Евгений",
            link:"https://ru.wikipedia.org/wiki/Ивченко,_Евгений_Михайлович"
        },
        {
            name:"ХМЕЛЕВСКИЙ Василий",
            link:"https://ru.wikipedia.org/wiki/Хмелевский,_Василий_Владимирович"
        },
        {
            name:"АСТАПКОВИЧ Игорь",
            link:"https://ru.wikipedia.org/wiki/Астапкович,_Игорь_Вячеславович"
        },
        {
            name:"ЦИЛЕНЬТЬ Валерий",
            link:"https://ru.wikipedia.org/wiki/Цилент,_Валерий_Антонович#:~:text=Валерий%20Антонович%20Цилент%20(род.%2029,в%20Атланте%2C%20участник%20двух%20Олимпиад"
        },
        {
            name:"САИДОВ ИБРАГИМ",
            link:"https://ru.wikipedia.org/wiki/Саидов,_Ибрагим_Магомедсаидович"
        }, {
            name:"Валюк Андрей",
            link:"https://ru.wikipedia.org/wiki/Валюк,_Андрей_Станиславович"
        }, {
            name:"Семенов Константин",
            link:"https://ru.wikipedia.org/wiki/Семёнов,_Константин_Валериевич"
        }, {
            name:"Ананько Людмила",
            link:"https://ru.wikipedia.org/wiki/Ананько,_Людмила_Аркадьевна"
        }, {
            name:"Сафронникова Наталья",
            link:"https://ru.wikipedia.org/wiki/Сафронникова,_Наталья_Вячеславовна"
        },
        {
            name:"Бубнович Виталий",
            link:"https://ru.wikipedia.org/wiki/Бубнович,_Виталий_Иванович"
        },
        {
            name:"Варец Дмитрий",
            link:"https://ru.wikipedia.org/wiki/Варец,_Дмитрий_Александрович"
        },
        {
            name:"Дуденкова Анна",
            link:"https://ru.wikipedia.org/wiki/Дуденкова,_Анна_Сергеевна"
        },
        {
            name:"Михальченко Игорь",
            link:"https://ru.wikipedia.org/wiki/Михальченко,_Игорь_Валерьевич"
        },
        {
            name:"Мацко Татьяна",
            link:"https://ru.wikipedia.org/wiki/Мацко,_Татьяна_Михайловна"
        },
        {
            name:"Королек Евгений",
            link:"http://www.wikidata.org/wiki/q27663512"
        },
        {
            name:"юреня олег",
            link:"http://ru.wikipedia.org/wiki/Юреня,%20Олег%20Олегович"
        },
        {
            name:"Мирон Олег",
            link:"https://translate.yandex.ru/translate?lang=en-ru&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FOleg_Miron&view=c"
        },
        {
            name:"Шестаков Александр",
            link:"http://ru.wikipedia.org/wiki/Шестаков,%20Александр%20Борисович"
        },
        {
            name:"Хямяляйнен Эдуард",
            link:"https://ru.wikipedia.org/wiki/Хямяляйнен,_Эдуард_Павлович"
        },
        {
            name:"Федоренко Анатолий",
            link:"https://ru.wikipedia.org/wiki/Федоренко,_Анатолий_Людвигович"
        },{
            name:"Павловский Иван",
            link:"https://en.wikipedia.org/wiki/Ivan_Pavlovsky#:~:text=Иван%20Павловский%20(родился%202%20декабря,летних%20Олимпийских%20играх%202000%20года"
        },
        {
            name:"Шурмей Павел",
            link:"https://en.wikipedia.org/wiki/Pavel_Shurmei#:~:text=Павел%20Антонович%20Шурмей%20(русский%3A%20Павел,гребном%20тренажере%20Concept2%20в%20помещении"
        },{
            name:"Устинов Александр",
            link:"https://biathlon.life/infotsentr/strany/athlet/3948-USTINOV-Alexandr"
        },
        {
            name:"Романчик Алексей",
            link:"https://www.grsu.by/korol/item/9345-article2151.html#:~:text=Алексей%20Романчик%20является%20мастером%20спорта,и%20спорта%20Иван%20Эдвардович%20Шарко"
        },
        {
            name:"Ваховяк Александр",
            link:"https://www.instagram.com/aleksandr_vakhoviak/"
        },
        {
            name:"Бубеович Виталий",
            link:"https://ru.wikipedia.org/wiki/Бубнович,_Виталий_Иванович"
        },{
            name:"Кулиев Радик",
            link:"https://ru.wikipedia.org/wiki/Кулиев,_Радик_Небиевич"
        },
        {
            name:"Лихорад Вадим",
            link:"https://ru.wikipedia.org/wiki/Лихорад,_Вадим_Александрович"
        },
        {
            name:"Мисюля Евгений",
            link:"https://ru.wikipedia.org/wiki/Мисюля,_Евгений_Николаевич"
        },
        {
            name:"Невмержицкая Елена",
            link:"https://ru.wikipedia.org/wiki/Невмержицкая,_Елена_Владимировна"
        },{
            name:"Артюхин Сергей",
            link:"https://ru.wikipedia.org/wiki/Артюхин,_Сергей_Евгеньевич"
        },
        {
            name:"Шабанов Али",
            link:"https://ru.wikipedia.org/wiki/Шабанов,_Али_Шабанович"
        },
        {
            name:"Чергейко Илья",
            link:"https://ru.wikipedia.org/wiki/Чергейко,_Илья_Владимирович"
        },
        {
            name:"Сабеев Арават",
            link:"https://ru.wikipedia.org/wiki/Сабеев,_Арават_Сергеевич"
        },
        {
            name:"Радкевич Борис",
            link:"https://ruwiki.press/es/Boris_Radkevich#:~:text=Борис%20Радкевич%20-%20в%20белорусском%2C,в%20категории%2054%20кг.%20%5B1%5D"
        },
        {
            name:"Кудряшова Ольга",
            link:"https://ru.wikipedia.org/wiki/Кудряшова,_Ольга_Сергеевна"
        },
        {
            name:"Батыров Альберт",
            link:"https://ru.wikipedia.org/wiki/Батыров,_Альберт_Георгиевич"
        },
        {
            name:"Шепелевич Жанна",
            link:"https://belinfosport.by/sportographija/sportographija_strelba_pul/shanna_schepelevitsch/"
        },
        {
            name:"Кривицкий Павел",
            link:"https://ru.wikipedia.org/wiki/Кривицкий,_Павел_Эдвардович"
        },
        {
            name:"Казак Андрей",
            link:"https://translate.yandex.ru/translate?lang=en-ru&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAndrei_Kazak&view=c"
        },
        {
            name:"Чичкан Елена",
            link:"http://www.polymia.by/2020/01/iz-glubinki-na-olimp-istoriya-eleny-chichkan-ili-kak-detskaya-vlyublennost-podarila-strane-novuyu-chempionku/"
        },
        {
            name:"Шиманович Оксана",
            link:"https://belinfosport.by/sportographija/sportographija_biatlon/oksana_schimanovitsch/"
        },{
            name:"Жук Артем",
            link:"https://belinfosport.by/sportographija/sportographija_prygki_na_batut/artjom_shuk/"
        },{
            name:"Хотян Ангелина",
            link:"https://belinfosport.by/sportographija/sportographija_prygki_na_batut/angelina_hotjan/"
        },
        {
            name:"Мазуренок Ольга",
            link:"https://ru.wikipedia.org/wiki/Мазурёнок,_Ольга_Сергеевна"
        },
        {
            name:"Трипуть Александр",
            link:"https://ru.wikipedia.org/wiki/Трипуть,_Александр_Чеславович"
        },
        {
            name:"Жук Виталий",
            link:"https://ru.wikipedia.org/wiki/Жук,_Виталий_Михайлович"
        },
        {
            name:"Кадимагомедов Магомедхабиб",
            link:"https://ru.wikipedia.org/wiki/Кадимагомедов,_Магомедхабиб_Зайнудинович"
        },
        {
            name:"Богушевич Светлана",
            link:"http://www.websmi.by/2021/09/v-svobodnoe-vremya-fotografiruyu-svetlana-bogushevich-chempionka-evropy-po-hokkeyu-na-trave-vo-vtorom-divizione/"
        },
        {
            name:"Силицкая Надежда",
            link:"https://grodnonews.by/news/sport/eto_prosto_bomba_grodnenki_delyatsya_vpechatleniyami_ot_pobedy_na_chempionate_evropy_po_indor_khokkeyu.html"
        },
        {
            name:"Ларичева Ирина",
            link:"https://en.wikipedia.org/wiki/Irina_Laricheva_(swimmer)#:~:text=Ирина%20Николаевна%20Ларичева%20(Русский%3A%20Ирина,Олимпийские%20игры%201984%20года%20из-за"
        },
        {
            name:"Прочкайло Марина",
            link:"http://dynamo.by/grodno/publications/news/regions/all/4447/"
        },
        {
            name:"Губкина Людмила",
            link:"https://ru.wikipedia.org/wiki/Губкина,_Людмила"
        },
        {
            name:"Ларичева Ирина",
            link:"https://en.wikipedia.org/wiki/Irina_Laricheva_(swimmer)#:~:text=Ирина%20Николаевна%20Ларичева%20(Русский%3A%20Ирина,Олимпийские%20игры%201984%20года%20из-за"
        },
        {
            name:"Басинский Игорь",
            link:"https://ru.wikipedia.org/wiki/Басинский,_Игорь_Михайлович"
        },
        {
            name:"Савко Александр",
            link:"https://ru.wikipedia.org/wiki/Савко,_Александр_Андреевич"
        },
        {
            name:"Карницкий Александр",
            link:"https://ruwiki.press/es/Aliaxandr_Karnitski#:~:text=Александр%20Карницкий%20-%20по-%20белорусски%2C,категории%20до%2058%20кг.%20%5B1%5D"
        },
        {
            name:"Бернадский Михаил",
            link:"https://ru.wikipedia.org/wiki/Бернадский,_Михаил_Адамович"
        },
        {
            name:"Лукашик Константин",
            link:"https://ru.wikipedia.org/wiki/Лукашик,_Константин_Леонидович"
        },
        {
            name:"Невмержицкая Елена",
            link:"https://ru.wikipedia.org/wiki/Невмержицкая,_Елена_Владимировна"
        },
        {
            name:"Логиш Артем",
            link:"http://www.polymia.by/2018/12/iz-glubinki-na-olimp-artyom-logish-i-ego-rodnye-rasskazali-o-sportivnom-puti-ot-agrogorodka-cirin-do-sbornoj-belarusi/"
        },
        {
            name:"Дубицкая Алена",
            link:"https://ru.wikipedia.org/wiki/Дубицкая,_Алёна_Викторовна"
        },
        {
            name:"Романчик Алексей",
            link:"https://www.grsu.by/korol/item/9345-article2151.html#:~:text=Алексей%20Романчик%20является%20мастером%20спорта,и%20спорта%20Иван%20Эдвардович%20Шарко"
        },
        {
            name:"Валюк Андрей",
            link:"https://ru.wikipedia.org/wiki/Валюк,_Андрей_Станиславович"
        },
        {
            name:"Шинтарь татьяна",
            link:"https://biathlon.life/infotsentr/sportsmeny/athlet/3326-SHYNTAR-Tatyana"
        },
        {
            name:"Беть Елена",
            link:"https://ru.wikipedia.org/wiki/Беть,_Елена_Викторовна"
        },
        {
            name:"Вакула Светлана",
            link:"https://ru.wikipedia.org/wiki/Вакула,_Светлана_Владимировна"
        },
        {
            name:"Родевич Валерий",
            link:"https://en.wikipedia.org/wiki/Valery_Rodevich#:~:text=Валерий%20Родевич%20(родился%2026%20апреля,летних%20Олимпийских%20играх%202008%20года"
        },
        {
            name:"Радевич Анна",
            link:"https://kraj.by/smorgon/news/sport/vospitanniki-smorgonskoy-shkoli-dzyudo-viigrali-zoloto-chempionata-belarusi"
        },
        {
            name:"Куди Виталий",
            link:"https://belinfosport.by/sportographija/sportographija_strelba_pul/kudi_vitalij/"
        },
        {
            name:"Зайчик Евгений",
            link:"https://news.sportbox.ru/Vidy_sporta/pulevaya_strelba/Jevgenij_Zajchik_Strelba_pulevaja_13021990"
        },
        {
            name:"Дуденкова Анна",
            link:"https://ru.wikipedia.org/wiki/Дуденкова,_Анна_Сергеевна"
        },
        {
            name:"жук артем",
            link:"https://belinfosport.by/sportographija/sportographija_prygki_na_batut/artjom_shuk/"
        },
        {
            name:"Грабовик Александр",
            link:"https://en.wikipedia.org/wiki/Aliaksandr_Hrabovik#:~:text=Александр%20Грабовик%20(родился%209%20декабря,года%20проводится%20в%20Минске%2C%20Беларусь"
        },
        {
            name:"Лях Павел",
            link:"https://ru.wikipedia.org/wiki/Лях,_Павел_Сергеевич"
        },
        {
            name:"Дуденкова Анна",
            link:"https://ru.wikipedia.org/wiki/Дуденкова,_Анна_Сергеевна"
        },
        {
            name:"Гуштын Александр",
            link:"https://ru.wikipedia.org/wiki/Гуштын,_Александр_Сергеевич"
        },
        {
            name:"Свита Алина",
            link:"https://belinfosport.by/sportographija/sportographija_greblja_na_baid/алина-свита/"
        },
        {
            name:"калюжная екатерина",
            link:"https://grodno-region.by/ru/sport-ru/#:~:text=Калюжная%20Екатерина%2C%20спортсменка-учащаяся%20ГУ%20«Гродненский,весовой%20категории%20свыше%2080%20кг"
        },
        {
            name:"черняк александр",
            link:"https://grodno-region.by/ru/sport-ru/#:~:text=Черняк%20Александр%2C%20спортсмен-учащийся%20государственного%20учреждения,на%20800%20и%201500%20метров"
        },
        {
            name:"еремич юрий",
            link:"https://grodno-region.by/ru/sport-ru/#:~:text=Еремич%20Юрий%2C%20спортсмен-учащийся%20государственного%20учреждения,атлетике%20в%20прыжках%20в%20длину"
        },
        {
            name:"Поэглите Шарлотта",
            link:"http://sportfpb.by/novosti/item/eyo-imya-sharlota-paeglite"
        },
        {
            name:"Скрябин Нюргун",
            link:"https://ru.wikipedia.org/wiki/Скрябин,_Нюргун_Владимирович"
        },
        {
            name:"Савко Александр",
            link:"https://ru.wikipedia.org/wiki/Савко,_Александр_Иванович"
        },
        {
            name:"Ануфриенко Наталья",
            link:"https://www.hmong.press/wiki/Natallia_Anufryienka#:~:text=Наталья%20Ануфриенко%20(родилась%2011%20июня,летних%20Олимпийских%20играх%202008%20года"
        },
        {
            name:"бобрик екатерина",
            link:"https://www.trackandfield.ru/ru/people/4055"
        },
        {
            name:"Дубкова Елена",
            link:"https://www.soccerstand.com/ru/player/dubkova-elena/b5p18H5N/results/"
        },
        {
            name:"Корейво Наталья",
            link:"https://ru.wikipedia.org/wiki/Корейво,_Наталья_Станиславовна"
        },
        {
            name:"Пчельник Дарья",
            link:"https://ru.wikipedia.org/wiki/Пчельник,_Дарья_Владимировна"
        },
        {
            name:"Венскель Александр",
            link:"https://grodno.in/news/10067/#:~:text=Александр%20Венскель%20—%20Мастер%20спорта,чемпионата%20Европы%20в%20сумме%20двоеборья"
        },
        {
            name:"Нуриков Азамат",
            link:"https://ru.wikipedia.org/wiki/Нуриков,_Азамат_Гусейнович"
        },
        {
            name:"Чугошвили Иосиф",
            link:"https://ru.wikipedia.org/wiki/Чугошвили,_Иосиф_Иванович"
        },
        {
            name:"Дауров Сослан",
            link:"http://ru.wikipedia.org/wiki/Дауров,%20Сослан%20Тамазович"
        },
        {
            name:"Кармильчик Евгений",
            link:"https://ruwiki.press/es/Yauhen_Karmilchyk#:~:text=Евгений%20Кармильчик%20-%20по-%20белорусски%2C,участвует%20в%20соревнованиях%20по%20боксу"
        },
        {
            name:"Карпач Андрей",
            link:"https://ru.wikipedia.org/wiki/Карпач,_Андрей_Сергеевич"
        },
        {
            name:"Данилович Ксения",
            link:"https://zviazda.by/be/node/142661"
        },
        {
            name:"",
            link:""
        },
        {
            name:"",
            link:""
        },
        {
            name:"",
            link:""
        },
        {
            name:"",
            link:""
        },
        {
            name:"",
            link:""
        },
        {
            name:"",
            link:""
        },















        {
            name:"Волчецкая Елена",
            link:"https://stuki-druki.com/authors/Volcheckaya-Elena.php"
        },
        {
            name:"Едешко Иван",
            link:"https://24smi.org/celebrity/34469-ivan-edeshko.html"
        },
        {
            name:"Корбут Ольга",
            link:"https://24smi.org/celebrity/5083-olga-korbut.html "
        },
        {
            name:"Романовский Владимир",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/romanovskij-vladimir-vatslavovich-greblya-na-bajdarkakh-i-kanoe/ "
        },
        {
            name:"Шилова Ирина",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/shilova-irina-olegovna-strelba-pulevaya-pnevmaticheskaya-vintovka/"
        },
        {
            name:"Горлукович Сергей",
            link:"https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%80%D0%BB%D1%83%D0%BA%D0%BE%D0%B2%D0%B8%D1%87,_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9_%D0%92%D0%B0%D0%B4%D0%B8%D0%BC%D0%BE%D0%B2%D0%B8%D1%87"
        },
        {
            name:"Курлович Александр",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/kurlovich-aleksandr-nikolaevich-tyazhelaya-atletika/"
        },
        {
            name:"Барбашинский Андрей",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/barbashinskij-andrej-stanislavovich-gandbol/ "
        },
        {
            name:"Лукашик Константин",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/lukashik-konstantin-leonidovich-strelba-pulevaya-pistolet/ "
        },
        {
            name:"Миневский Андрей",
            link:"https://www.noc.by/olympic-games/team/chempiony-olimpijskih/minevskij-andrej-petrovich-gandbol/ "
        },
        {
            name:"Корольчик Янина",
            link:"http://biblioteka-svisloch.by/pages/provalinskaya-korolchik-yanina-dislavovna/ "
        }
    ]
    const {request} = useHttp()
    const [li1,set_li1] = useState("1")
    const [sport,setSport] = useState()
    const [sp,setSp] = useState(null)
    const [li2,set_li2] = useState("1")
    const [ch,setCh] = useState("o")
    const [list,setList] = useState(null)
    const [list2,setList2] = useState(null)
    const fetchAll = React.useCallback(async ()=>{
        try {

            let data = await request("/api/champ/"+type, 'GET')
            setList(data)
            setList2(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    const [type,setType] = useState("ol champ")
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll()
        };

        fetchData();
    },[type])
    const set =async (tp) => {
        await setType(null)
        setType(tp)
    }
    const setChamp =async (tp) => {
        setCh(tp)
    }
    const getLink = (name) =>{
        let l = "Hello"
        for(let it of links){
            if(it.name.toLowerCase() ===name.toLowerCase()){
                l = it.link
            }
        }
        if (l === "Hello"){
            l = "https://yandex.by/search/?text=" + name
        }
        return l
    }

    const change = (event) => {
        Sport(event.target.value)
    }

    const Sport = async (sp)=>{
        let arr = []
        for(let i in list2){
            if(list2[i].sport.toLowerCase().includes(sp.toLowerCase())){
                arr.push(list2[i])
            }
        }
        if(arr.length===0){
            setList(list2)
        }
        else{
            setList(arr)
        }

    }

    if(!!list){
        return (
            <div>
                <div className="cont">
                    <ul className="sports">
                        <li>
                            <button className="sport"
                                style={
                                    sp===1? {background:"red"}: {}
                                }
                                onClick={()=>{Sport("волейбол");setSp(1)}}>Волейбол</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===2?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("футбол");setSp(2)}}>Футбол</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===3?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("стрельба пулевая");setSp(3)}}>Стрельба пулевая</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===4?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("гребля на байдарках и каноэ");setSp(4)}}>Гребля на байдарках и каноэ</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===5?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("гимнастика");setSp(5)}}>Гимнастика</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===6?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("легкая атлетика");setSp(6)}}>Легкая атлетика</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===7?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("фехтование");setSp(7)}}>Фехтование</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===8?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("борьба греко-римская");setSp(8)}}>Борьба греко-римская</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===9?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("баскетбол");setSp(9)}}>Баскетбол</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===10?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("гребля академическая");setSp(10)}}>Гребля академическая</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===11?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("борьба вольная");setSp(11)}}>Борьба вольная</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===12?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("биатлон");setSp(12)}}>Биатлон</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===13?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("биатлон летний");setSp(13)}}>Биатлон летний</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===14?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("индорхоккей");setSp(14)}}>Индорхоккей</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===15?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("хоккей на траве");setSp(15)}}>Хоккей на траве</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===16?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("плавание");setSp(16)}}>Плавание</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===17?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("бокс");setSp(17)}}>Бокс</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===18?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("таиландский бокс");setSp(18)}}>Тайландский бокс</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===19?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("дзюдо");setSp(19)}}>Дзюдо</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===20?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("самбо");setSp(20)}}>Самбо</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===21?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("велоспорт");setSp(21)}}>Велоспорт</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===22?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("скретч");setSp(22)}}>Велосипедный спорт (скретч)</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===23?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("шашки");setSp(23)}}>Шашки</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===24?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("парусный спорт");setSp(24)}}>Парусный спорт</button>
                        </li>
                        <li>
                            <button className="sport"
                                style={
                                    sp===25?{background:"red"}:{}
                                }
                                onClick={()=>{Sport("прыжки на батуте");setSp(25)}}>Прыжки на батуте</button>
                        </li>
                        <li>
                            <button className="sport"
                                    style={
                                        sp===26?{background:"red"}:{}
                                    }
                                    onClick={()=>{Sport("стрельба из лука");setSp(26)}}>Стрельба из лука</button>
                        </li>
                        <li>
                            <button className="sport"
                                    style={
                                        sp===27?{background:"red"}:{}
                                    }
                                    onClick={()=>{Sport("тяжелая атлетика");setSp(27)}}>Тяжелая атлетика</button>
                        </li>
                        <li>
                            <button className="sport"
                                    style={
                                        sp===27?{background:"red"}:{}
                                    }
                                    onClick={()=>{Sport("гандбол");setSp(28)}}>Гандбол</button>
                        </li>
                    </ul>
                    <div className="right">

                    <h3 className="h1_c">Чемпионы Гродненской области</h3>

                    <ul className="list">

                        <li className="bt">
                            <div>
                                <button

                                    style={li1==="1"?{color:"black"}:li1==="2"?{}:{}}
                                    onClick={()=>{
                                        setChamp("o")
                                        setSp(null)
                                        set_li2("1")
                                        set("ol champ")
                                        set_li1("1")
                                    }}>Олимпийские игры</button>
                            </div>
                        </li>

                        <li className="bt">
                            <div>
                                <button
                                    style={li1==="1"?{}:li1==="2"?{color:"black"}:{}}
                                    onClick={()=>{
                                        setChamp("w")
                                        setSp(null)
                                        set("w champ")
                                        set_li2("1")
                                        set_li1("2")
                                    }}>Чемпионаты мира</button>
                            </div>
                        </li>
                        <li className="bt">
                            <div>
                                <button
                                    style={li1==="1"?{}:li1==="2"?{}:{color:"black"}}
                                    onClick={()=>{
                                        setChamp("e")
                                        setSp(null)
                                        set("e champ")
                                        set_li2("1")
                                        set_li1("3")
                                    }}>Чемпионаты Европы</button>
                            </div>
                        </li>
                    </ul>

                    {
                        ch==="o"?
                            <ul className="list_2">
                                <li>
                                    <button
                                        style={li2==="1"?{color:"red"}:li2==="2"?{}:{}}
                                        onClick={()=>{
                                            set("ol champ")
                                            setSp(null)
                                            set_li2("1")
                                        }}>
                                        <h3>Олимпийские чемпионы – спортсмены Гродненской области</h3>
                                    </button>

                                </li>
                                <li>
                                    <button
                                        style={li2==="1"?{}:li2==="2"?{color:"red"}:{}}
                                        onClick={()=>{
                                            set("ol 2nd")
                                            setSp(null)
                                            set_li2("2")
                                        }}>
                                        <h3>Серебряные призеры Олимпийских игр – спортсмены Гродненской области</h3>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        style={li2==="1"?{}:li2==="2"?{}:{color:"red"}}
                                        onClick={()=>{
                                            set("ol 3rd")
                                            setSp(null)
                                            set_li2("3")
                                        }}>
                                        <h3>Бронзовые призеры Олимпийских игр – спортсмены Гродненской области</h3>
                                    </button>
                                </li>
                            </ul>
                            :ch==="e"?
                                <ul className="list_2">
                                    <li>
                                        <button
                                            style={li2==="1"?{color:"red"}:li2==="2"?{}:{}}
                                            onClick={()=>{
                                                set("e champ")
                                                setSp(null)
                                                set_li2("1")
                                            }}>
                                            <h3>Чемпионы Европы – спортсмены Гродненской области</h3>
                                        </button>

                                    </li>
                                    <li>
                                        <button
                                            style={li2==="1"?{}:li2==="2"?{color:"red"}:{}}
                                            onClick={()=>{
                                                set("e 2nd")
                                                setSp(null)
                                                set_li2("2")
                                            }}>
                                            <h3>Серебряные призеры чемпионатов Европы - спортсмены Гродненской области</h3>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            style={li2==="1"?{}:li2==="2"?{}:{color:"red"}}
                                            onClick={()=>{
                                                set("e 3rd")
                                                setSp(null)
                                                set_li2("3")
                                            }}>
                                            <h3>Бронзовые призеры чемпионатов Европы - спортсмены Гродненской области</h3>
                                        </button>
                                    </li>
                                </ul>
                                :
                                <ul className="list_2">
                                    <li>
                                        <button
                                            style={li2==="1"?{color:"red"}:li2==="2"?{}:{}}
                                            onClick={()=>{
                                                set("w champ")
                                                setSp(null)
                                                set_li2("1")
                                            }}>
                                            <h3>Чемпионы мира — спортсмены Гродненской области </h3>
                                        </button>

                                    </li>
                                    <li>
                                        <button
                                            style={li2==="1"?{}:li2==="2"?{color:"red"}:{}}
                                            onClick={()=>{
                                                set("w 2nd")
                                                setSp(null)
                                                set_li2("2")
                                            }}>
                                            <h3>Серебряные призеры чемпионатов мира — спортсмены Гродненской области</h3>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            style={li2==="1"?{}:li2==="2"?{}:{color:"red"}}
                                            onClick={()=>{
                                                set("w 3rd")
                                                setSp(null)
                                                set_li2("3")
                                            }}>
                                            <h3> Бронзовые призеры чемпионатов мира — спортсмены Гродненской области </h3>
                                        </button>
                                    </li>
                                </ul>
                    }




                        <select onChange={(event)=>{
                            change(event)
                        }} className="select">
                            <option >Выберите вид спорта</option>
                            <option >Волейбол</option>
                            <option >Футбол</option>
                            <option >Гандбол</option>
                            <option >Стрельба пулевая</option>
                            <option >Гребля на байдарках и каноэ</option>
                            <option >Гимнастика</option>
                            <option >Легкая атлетика</option>
                            <option >Фехтование</option>
                            <option >Борьба греко-римская</option>
                            <option >Баскетбол</option>
                            <option >Гребля академическая</option>
                            <option >Борьба вольная</option>
                            <option >Биатлон</option>
                            <option >Биатлон летний</option>
                            <option >Индорхоккей</option>
                            <option >Хоккей на траве</option>
                            <option >Плавание</option>
                            <option >Бокс</option>
                            <option >Таиландский бокс</option>
                            <option >Дзюдо</option>
                            <option >Самбо</option>
                            <option >Велоспорт</option>
                            <option >Скретч</option>
                            <option >Шашки</option>
                            <option >Парусный спорт</option>
                            <option >Прыжки на батуте</option>
                            <option >Стрельба из лука</option>
                            <option >Тяжелая атлетика</option>
                        </select>

                    <ul className="ul">
                        <li className="title_champ">
                            {
                                type==="ol champ"?
                                    "Олимпийские чемпионы":
                                type==="ol 2nd"?
                                    "Серебряные призеры Олимпийских игр":
                                type==="ol 3rd"?
                                    "Бронзовые призеры Олимпийских игр":
                                type==="w 3rd"?
                                    "Бронзовые призеры чемпионатов мира":
                                type==="w 2nd"?
                                    "Серебряные призеры чемпионатов мира":
                                type==="w champ"?
                                    "Чемпионы мира":
                                type==="e 3rd"?
                                    "Бронзовые призеры чемпионатов Европы":
                                type==="e 2nd"?
                                    "Серебряные призеры чемпионатов Европы":
                                "Чемпионы Европы"


                            }
                            <br/>
                            <br/>
                        </li>
                        {
                            list.map(item => (

                                <li className="li5">
                                    <a className="li5 h5" target="_blank" href={
                                        getLink(item.name)
                                    } >
                                        {item.name}
                                    </a>
                                    <h5 className="li5 h5">
                                        {item.sport}
                                    </h5>
                                    <h5 className="li5 h5">
                                        {item.year}
                                    </h5>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                    </div>
            </div>
        );
    }
    else{
        return (
            <div className="loading">Loading</div>
        )
    }

};

export default Champions;
