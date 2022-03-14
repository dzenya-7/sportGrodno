import './styles/UserPage.css';
import React, {Component} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/Footer";


const UserPage = () => {

    const redirect = ()=>{
        window.location.assign('/home');
    }

    const storageName = 'userData'
    const d = JSON.parse(localStorage.getItem(storageName))
    console.log(d)
    const logout = () => {
        localStorage.removeItem(storageName);
        redirect()
    }



    return (
        <React.Fragment>
            <div className="main_user">
                <button onClick={logout}> Выйти </button>
                <a target="_blank" href="mailto:sportgrodno@gmail.com"> Обратная связь </a>
            </div>
        </React.Fragment>
    );
}

export default UserPage;