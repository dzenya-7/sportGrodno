import './styles/LoginInput.css';
import {useState} from "react";
import hidePwdImg from "../img/hide-password.svg"
import showPwdImg from "../img/show-password.svg"

const PasswordInput = (props) => {

    let [Visibility,setVisibility] = useState(false);
    const togglePasswordVisiblity = () => {
        setVisibility(!Visibility)
    };
    return (
        <div className="pwd-container">
            <label htmlFor={props.value + props.name}>{props.name}</label>
            <input className="pwd_text" type={Visibility? "text" : "password"} id={props.value + props.name} name={props.value} value={props.clear===true?"":props.value} onChange = {props.onChangeInputValue} />
            <img
                title={Visibility ? "Hide password" : "Show password"}
                src={Visibility ? hidePwdImg : showPwdImg}
                onClick={togglePasswordVisiblity}
            />
        </div>
    );
};

export default PasswordInput;