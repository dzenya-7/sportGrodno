import './Modal.css';
import React from 'react';
import Login from "./Login";

const Modal = ({active, setActive}) =>{

    const cancel = () =>{
        setActive(!active)
    }
    return (
        <div className={active? "modal active" : "modal"} onClick={cancel}>
            <div>
                <button>XXX</button>
                <div className="modal__content" onClick={event => event.stopPropagation()}>
                    <Login active={active}/>

                </div>
            </div>
        </div>
    )
}

export default Modal