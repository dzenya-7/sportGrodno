import Header from "../../components/header/Header";
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import NavLink from "react-router-dom/es/NavLink";
import './styles/Admin.css';
import Footer from "../../components/Footer";

const AdminPage = ()=>{
    return(
        <div>
            <Header/>
            <div className="main_admin">
                <ul>
                    <li>
                        <NavLink to="newsList">Новости</NavLink>
                    </li>
                    <li>
                        <NavLink to="editGoals">Достижения</NavLink>
                    </li>
                    <li>
                        <NavLink to="schoolsList">Школы</NavLink>
                    </li>
                </ul>

            </div>
            <Footer/>




        </div>
    )
}
export default AdminPage