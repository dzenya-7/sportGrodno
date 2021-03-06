import React, {useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import Header from "../components/header/Header";
import NavLink from "react-router-dom/es/NavLink";
import Footer from "../components/Footer";
import "./styles/SGoals.css"

const GoalsList = () => {
    const {request} = useHttp()
    let [school, setSchool] = useState(null)
    const nextPage = async () => {
        setNews_1(null)
        let number = pageNumber +1
        setPageNumber(number)
    }
    const prevPage = async () => {
        setNews_1(null)
        if(pageNumber >1){
            let number = pageNumber - 1
            setPageNumber(number)
        }
    }
    const [news_1, setNews_1] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const fetch = React.useCallback(async ()=>{
        try {
            let darr = await request("/api/new/count", "GET")
            let d = await request("/api/schools/items", 'POST',{arr:darr})
            setSchool(d)
            let data = await request("/api/new/football/"+pageNumber.toString(), 'GET')
            setNews_1(data)
        } catch (e) {
            console.error(e.message)
        }
    })
    const del = async (id) => {
        let data = await request("/api/new/football/delete/" + id, 'POST')
        window.location.assign('http://localhost:3000/editGoals');
    }
    useEffect(()=>{
        const fetchData = async () => {
            await fetch()
            window.scrollTo(0,0)
        };

        fetchData();
    },[pageNumber])


    useEffect(()=>{
        const fetchData = async () => {
            await fetch()
        };

        fetchData();
    },[])
    if(!!news_1){
        return (

            <div>
                <div className="main_goal_2">

                </div>
                <ul className="li_goal">{
                    news_1.map(item_2 =>(
                        <li className="sg_li" key = {item_2.id}>
                            <NavLink to={`/goal/${item_2._id}`}>
                                <img className="sg_img" src={item_2.img}></img>
                                <h3 className="sg_h3">{item_2.title}</h3>
                                <div className="new_title">
                                    <h5 className="t_h5_1">
                                        {item_2.date.split("T")[0].split("-")[2]+
                                            "."+ item_2.date.split("T")[0].split("-")[1]+
                                            "."+ item_2.date.split("T")[0].split("-")[0]}
                                    </h5>
                                    <h5 className="t_h5_2">
                                        {item_2.date.split("T")[1].split(".")[0].split(":",-1)[0]+
                                            ":"+item_2.date.split("T")[1].split(".")[0].split(":",-1)[1]
                                        }
                                    </h5>
                                    <h5 className="t_h5"> ???????????????????? ????????????????????</h5>
                                </div>

                                <h5 className="sg_h5">{item_2.text}</h5>
                            </NavLink>

                        </li>
                    ))
                }
                <li>
                    <div className="pageBottom2">
                        <button className="arr_cont"  onClick={prevPage}>
                            <div className="arr" ></div>
                        </button>
                        <h3>{pageNumber}</h3>

                        <button className="arr2_cont"  onClick={nextPage}>
                            <div className="arr2" ></div>
                        </button>
                    </div>
                </li>

                </ul>
            </div>
        );
    }
    else return (
        <div className="loading">Loading</div>
    )
};

export default GoalsList;