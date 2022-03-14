import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Header from "../../components/header/Header";
import NavLink from "react-router-dom/es/NavLink";
import './styles/SchoolsList.css'

const SchoolsList = () => {
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
                <Header/>
                <ul className="news__list_3">
                    {

                        news.map(item => (
                            <li key = {item.id}>
                                <img src={item.img} alt={item.title} width="220" height="220"/>
                                <NavLink to={`/editSchoolPage/` + item.id.toString()}>{item.text}</NavLink>

                                <br/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
    else {
        return (
            <h1>Loading</h1>
        )
    }
};

export default SchoolsList;