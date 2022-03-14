import "./styles/Hockey.css"
import React, {Component, useEffect, useState} from 'react';
import Header from "../components/header/Header";
import {useHttp} from "../hooks/http.hook";
import NavLink from "react-router-dom/es/NavLink";

const Schools = () => {
    const {request} = useHttp()
    const [news, setNews] = useState(null)
    const fetchAll = React.useCallback(async ()=>{
        try {
            let data = await request("/api/schools/", 'GET')
            setNews(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll()
        };
        fetchData();
    },[])
    if(!!news){
        return (
            <div>
                <div>
                    <ul className="news__list_2">
                        {
                            news.map(item => (
                                <li className="li4" key = {item.id}>
                                    <NavLink to={`/schoolPage/` + item.id.toString()}>
                                        <img className="image" src={item.img} alt={item.title} width="150" height="150"/>
                                        <h3 className="h3">
                                            {item.text}
                                        </h3>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div>
        );
    }
    else {
        return (
            <div className="loading">Loading</div>
        )
    }
}

export default Schools;