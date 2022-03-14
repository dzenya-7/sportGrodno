import './styles/Goal.css';
import React, {useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import Header from "../components/header/Header";
import NavLink from "react-router-dom/es/NavLink";
import Footer from "../components/Footer";

const Goal = () => {


    const {request} = useHttp()
    const [New, setNew] = useState(null)
    const fetchAll1 = React.useCallback(async ()=>{
        try {
            let url = window.location.href.split("/")
            let id = url.at(-1)
            let data = await request("/api/new/football/id/"+id, 'GET')
            data = data.at(0)
            let txt = data.text
            txt = txt.split("\n")
            txt = txt.filter(function (el) {
                if (el!="" || el!="\t  \t")
                    return (el);
            });
            for(let i in txt){
                    txt[i] = "\t\t" + txt[i]
            }
            data.text = txt
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
            <div className="goal">

                <div className="main_goal">
                    <h1 className="h_goal">{New.title}</h1>
                    <div className="inner">

                        <img className="img_new" src={New.img}  height="400" width="400"/>

                    </div>
                    <ul className="ul_1">
                        {
                            New.text.map(item_2 =>(
                                <li key = {item_2.id}>

                                    <b>{item_2}</b>

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
};

export default Goal;