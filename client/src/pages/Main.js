import './styles/Main.css';
import React, {Component} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import Banner from "../components/banner/Banner";
import LastNews from "../components/last-news/LastNews";
import {Link, NavLink} from "react-router-dom";
import {pathLinks} from "../consts";
import goals from "./photos/goals.png"


const Main = (isAdmin) => {
    return (
        <div>
            <div className="main_goal_3">
                <Banner/>
                <LastNews/>
                <div>
                 <span className="link">
                    <Link to={pathLinks.goalsList}>
                        <img className="main_img" src={goals}/>
                    </Link>
                </span>


                </div>
            </div>
        </div>
    );
};

export default Main