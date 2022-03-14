import './Header.css';
import { pathLinks } from '../../consts';
import { Link } from 'react-router-dom';
import {useAuth} from "../../hooks/http.hook";
import React, {useEffect, useState} from "react";
import Modal from "../Modal";


const storageName = 'userData'
const Header = () => {
        let url = window.location.href.split("/")
        let id = url.at(-1)
        let {token} = useAuth()
        let isAuthenticated = !!token
        const [modalActive,setModalActive] = useState(false)
        const [page,setPage] = useState(id)
        const [burg,setBurg] = useState(false)
        const getLinkTitle = () =>{
            if(isAuthenticated)
                return "Моя страница"
            else
                return "Вход"
        }

        let isAdmin = false
        const d = JSON.parse(localStorage.getItem(storageName))
        if(d!=null){
            isAdmin = d.isAdmin
        }
        const toAdmin = ()=>{
            window.location.assign('/admin');
        }
        const modal = ()=>{
            setModalActive(!modalActive)

        }
        const burger = () =>{
            setBurg(!burg)
        }
        useEffect(()=>{
            let url = window.location.href.split("/")
            let id = url.at(-1)
            setPage(id)
        },[window.location.href.split("/").at(-1)])



        return (
            <header className="header"
                    style={{color:"red"}}
            >
                <div className="header__container"

                >




                    <Link
                        onClick={()=>{
                            setPage("")
                        }}
                        to={pathLinks.home} className="header__logo logo">
                        {"SportGrodno"}
                    </Link>

                    <div className="menu-burger__header" onClick={()=>{
                        burger()
                    }}>
                        <span></span>
                    </div>

                        <nav className="header__nav" >
                            <ul className="nav__list" >
                                <li className="item" >
                                    <Link  onClick={()=>{
                                        setPage("schools")
                                    }} style={page === "schools"? {color:"red"}:{}} to={"/" + pathLinks.schools}>Спортивные школы</Link>
                                </li>
                                <li className="item">
                                    <Link
                                        onClick={()=>{
                                            setPage("football")
                                        }}
                                        style={window.location.href.split("/").at(-1) === "football"? {color:"red"}:{}} to={"/" + pathLinks.football}>Новости cпорта</Link>
                                </li>
                                <li className="item">
                                    <Link
                                        onClick={()=>{
                                            setPage("champions")
                                        }}
                                        style={window.location.href.split("/").at(-1) === "champions"? {color:"red"}:{}} to={"/" + pathLinks.champions}>Чемпионы</Link>
                                </li>
                                <li className="item">
                                    <Link
                                        onClick={()=>{
                                            setPage("goalsList")
                                        }}
                                        style={window.location.href.split("/").at(-1) === "goalsList"? {color:"red"}:{}} to={"/" + pathLinks.goalsList}>Достижения учебных заведений</Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={()=>{
                                            setPage("translation")
                                        }}
                                        style={window.location.href.split("/").at(-1) === "translation"? {color:"red"}:{}} to={"/" + pathLinks.translation}>Трансляция</Link>
                                </li>

                            </ul>
                        </nav>

                    <nav className="header__nav" >
                        <ul className="nav__list_2" style={burg?{display:"flex", direction:"column"}:{}}>
`
                            <li className="item" >
                                <Link
                                    onClick={()=>{
                                        setPage("schools")
                                        setBurg()
                                    }}
                                    style={id === "schools"? {color:"red"}:{}} to={"/" + pathLinks.schools}>Спортивные школы</Link>
                            </li>
                            <li className="item">
                                <Link
                                    onClick={()=>{
                                        setPage("football")
                                        setBurg()
                                    }}
                                    style={id === "football"? {color:"red"}:{}} to={"/" + pathLinks.football}>Новости cпорта</Link>
                            </li>
                            <li className="item">
                                <Link
                                    onClick={()=>{
                                        setPage("champions")
                                        setBurg()
                                    }}
                                    style={id === "champions"? {color:"red"}:{}} to={"/" + pathLinks.champions}>Чемпионы</Link>
                            </li>
                            <li className="item">
                                <Link
                                    onClick={()=>{
                                        setPage("goalsList")
                                        setBurg()
                                    }}
                                    style={id === "goalsList"? {color:"red"}:{}} to={"/" + pathLinks.goalsList}>Достижения учебных заведений</Link>
                            </li>
                            <li className="item">
                                <Link
                                    onClick={()=>{
                                        setPage("translation")
                                        setBurg()
                                    }}
                                    style={id === "translation"? {color:"red"}:{}} to={"/" + pathLinks.translation}>Трансляция</Link>
                            </li>
                            <li className="item">
                                <button style={burg?{display:"flex", direction:"column"}:{}} className="reg___button" onClick={()=>{
                                    burger()
                                    if(isAuthenticated){
                                        window.location.assign('/login');
                                    }
                                    else {
                                        modal()
                                    }
                                }}>{getLinkTitle()}</button>
                            </li>
                            <li className="item">
                                {isAdmin?  <button  className="admin_button" style={burg?{display:"flex", direction:"column"}:{}} onClick={()=>{
                                toAdmin();burger()
                                }
                                }>Админка </button>: <div></div>}

                            </li>
                        </ul>
                    </nav>
                    <Modal active={modalActive} setActive={setModalActive}/>
                    <button  className="reg___button" onClick={()=>{
                        if(isAuthenticated){
                            window.location.assign('/login');
                        }
                        else {
                            modal()
                        }
                    }}>{getLinkTitle()}</button>
                    {isAdmin?  <button  className="admin_button"  onClick={toAdmin}>Админка </button>: <div></div>}




                </div>

            </header>
        );
}

export default Header;
