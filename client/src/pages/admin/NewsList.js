import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import Header from "../../components/header/Header";
import NavLink from "react-router-dom/es/NavLink";
import './styles/Newslist.css'

const NewsList = () => {
    const nextPage = async () => {
        setNews(null)
        let number = pageNumber +1
        setPageNumber(number)
    }
    const prevPage = async () => {
        setNews(null)
        if(pageNumber >1){
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
        };

        fetchData();
    },[pageNumber])
    const del = async (id) => {
        let data = await request("/api/news/delete/" + id, 'POST')
        window.location.assign('http://localhost:3000/newsList');
    }
    if(!!news){
        return (
            <div>

                <ul className="news__list_5">
                    {

                        news.map(item => (
                            <li key = {item.id}>
                                <img src={item.img} alt={item.title} width="340" height="220"/>
                                <NavLink className="txt_2" to={`/editNew/${item._id}`}>{item.title}</NavLink>
                                <button  className="butt" onClick={()=> {
                                    del(item._id)
                                }}> Удалить </button>
                            </li>
                        ))
                    }
                </ul>
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
            </div>
        );
    }
    else return (
        <div>Loading</div>
    )
};

export default NewsList;