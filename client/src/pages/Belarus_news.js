import './styles/Futball.css';
import React, {useCallback, useEffect, useState} from 'react';
import Header from "../components/header/Header";
import {useHttp} from "../hooks/http.hook";
import first from "./photos/first.png"
import NavLink from "react-router-dom/es/NavLink";
import Footer from "../components/Footer";

const Belarus_news = () => {
    const nextPage = async () => {
        setNews(null)
        let number = pageNumber+1
        setPageNumber(number)
    }
    const prevPage = async () => {
        if(pageNumber >1){
            setNews(null)
            let number = pageNumber - 1
            setPageNumber(number)
        }
    }
    const {request} = useHttp()
    const [news, setNews] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const fetchAll = React.useCallback(async ()=>{
        try {
            let data = await request("/api/news/"+pageNumber.toString(), 'GET')
            setNews(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll()
            window.scrollTo(0,0)
        };

        fetchData();
    },[pageNumber])
    if(!!news){
        return (
            <div>
                <div className="main_foot">
                    <ul className="news__list"
                        style={{
                            backgroundRepeat:"no-repeat",
                            backgroundSize:"100% 100%",

                        }}
                    >
                        {

                            news.map(item => (
                                <li className="li" key = {item.id}>
                                    <NavLink className="title" to={`/newPage/${item._id}`}>
                                        <img className="img" src={item.img} alt={item.title} width="450" height="150"/>
                                        <h3 className="main_new_title">{item.title}</h3>
                                        <div className="new_title">
                                            <h5 className="t_h5_1">
                                                {item.date.split("T")[0].split("-")[2]+
                                                    "."+ item.date.split("T")[0].split("-")[1]+
                                                    "."+ item.date.split("T")[0].split("-")[0]}
                                            </h5>
                                            <h5 className="t_h5_2">
                                                {item.date.split("T")[1].split(".")[0].split(":",-1)[0]+
                                                    ":"+item.date.split("T")[1].split(".")[0].split(":",-1)[1]
                                                }
                                            </h5>
                                            <h5 className="t_h5"> Спортивные новости</h5>
                                        </div>

                                        <h5 className="h5">{item.text}</h5>
                                    </NavLink>
                                </li>
                            ))
                        }
                        <div className="pageBottom">

                            <button className="arr_cont"  onClick={prevPage}>
                                <div className="arr" ></div>
                            </button>
                            <h3>{pageNumber}</h3>

                            <button className="arr2_cont"  onClick={nextPage}>
                                <div className="arr2" ></div>
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
    else return (
        <div className="loading">Loading</div>
    )






}

export default Belarus_news;