import React, {Component, useEffect, useState} from 'react';
import Header from "../components/header/Header";
import {useHttp} from "../hooks/http.hook";
import "./styles/NewPage.css"
import Footer from "../components/Footer";
const storageName = 'userData'


const NewPage = () => {
    const {request} = useHttp()
    const [New, setNew] = useState(null)
    const fetchAll1 = React.useCallback(async ()=>{
        try {
            let url = window.location.href.split("/")
            let id = url.at(-1)
            let data = await request("/api/news/id/"+id, 'GET')
            data = data.at(0)
            setNew(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    useEffect(()=>{
        const fetchData = async () => {
            await fetchAll1()
        };

        fetchData();
    },[])
    if(!!New){
        return (
            <div >
                <link rel='stylesheet' href="./styles/NewPage.css" type="text/css"/>
                <div className="main_2">
                    <h2 className="h1">{New.title}</h2>
                    <div className="inner">

                        <img className="img_new" src={New.img}  height="400" width="400"/>

                    </div>
                    <ul className="ul_goal">
                        {New.text.map(item => (
                            <li className="li_goal" key = {item.id}>
                                <h2 className="h">{item}</h2>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
    else return (
        <div className="loading">Loading</div>
    )



}


export default NewPage;