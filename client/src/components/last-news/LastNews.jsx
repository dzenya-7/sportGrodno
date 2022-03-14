import './LastNews.css';
import NavLink from "react-router-dom/es/NavLink";
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";

const LastNews = () => {
    const {request} = useHttp()
    const [news, setNews] = useState(null)
    const fetchAll = React.useCallback(async ()=>{
        try {
            let data = await request("/api/news/lastNews", 'GET')
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
            <section className="last-news">
                <div className="container1">
                    <div className="wrapper">
                        <div className="first">
                            <NavLink className="box-1" to={`/newPage/${news[0]._id}`}>
                                <img className="img" src={news[0].img} alt={news[0].title} width="400" height="200"/>
                                <h3>{news[0].title}</h3>
                            </NavLink>
                        </div>

                        <div className="first">
                            <NavLink className="box-2" to={`/newPage/${news[1]._id}`}>
                                <img className="img" src={news[1].img} alt={news[1].title} width="400" height="200"/>
                                <h3>{news[1].title}</h3>
                            </NavLink>
                        </div>
                        <div className="first">
                            <NavLink className="box-2" to={`/newPage/${news[2]._id}`}>
                                <img className="img" src={news[2].img} alt={news[2].title} width="400" height="200"/>
                                <h3>{news[2].title}</h3>
                            </NavLink>
                        </div>
                        <div className="third">
                            <NavLink className="box-2" to={`/newPage/${news[3]._id}`}>
                                <img className="img" src={news[3].img} alt={news[3].title} width="400" height="200"/>
                                <h3>{news[3].title}</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return (
            <div>
                <ul className="news__list">
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
                Loading
            </div>
        )
    }

};
export default LastNews
