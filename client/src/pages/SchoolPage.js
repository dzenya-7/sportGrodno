import Header from "../components/header/Header";
import {useHttp} from "../hooks/http.hook";
import React, {useEffect, useState} from "react";
import "./styles/Schoolpage1.css"
import Footer from "../components/Footer";
const storageName = "hi"

const SchoolPage = () => {
    let url = window.location.href.split("/")
    let id = url.at(-1)
    const {request} = useHttp()
    const [New, setNew] = useState(null)
    const fetchAll1 = React.useCallback(async ()=>{
        try {
            let url = window.location.href.split("/")
            let id = url.at(-1)
            let data = await request("/api/schools/"+id.toString(), 'GET')
            setNew(data)
            localStorage.setItem(storageName,JSON.stringify(
                data,id
            ))
            if(data!==null && id === data[0].id){
            }
            else{
            }
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
        return(
                <div>
                    <div className="main">
                        <div className="top">
                            <img className="img_sc" src={New[0].img} width={200} height={200}/>
                            <h2 className="sch_a">
                                <a  href={New[0].site} target="_blank">
                                    {New[0].text}
                                </a>
                            </h2>
                        </div>
                        <div className="sch_desc">
                            <br/>
                            <h4> Адрес: {New[0].address}</h4>
                            <br/>
                            <h4> Телефон: {New[0].phone}</h4>
                            <br/>
                            <h4> Директор: {New[0].director}</h4>
                            <br/>
                            <h4>Виды спорта: {New[0].sports}</h4>
                            <br/>
                            <br/>
                            <h4>{New[0].title}</h4>
                            <br/>
                        </div>
                        <div className="img_sc_3">
                            {
                                New[0].photos[0]!==""?
                                    New[0].photos.map(item => (
                                        <div >
                                            <img src={item} key={New[0].photos.length}  />
                                        </div>
                                    ))
                                    :
                                    <div>
                                        <h1></h1>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
        )
    }
    else{
        return (
            <div className="loading">Loading</div>
        )
    }
}

export default SchoolPage