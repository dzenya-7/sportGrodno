
import LoginInput from './LoginInput';
import {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import PasswordInput from "./PasswordInput";
import "./Login.css"
const storageName = 'userData'

const Login = (active) => {
    const auth = useContext(AuthContext)
    const {token, log } = useAuth()
    let [login,setLogin] = useState("");
    let [Error,setError] = useState(null);
    let [password,setPassword] = useState("");
    const {loading,request} = useHttp()
    const onChangeInputLogin = (e) => {
        setLogin(login = e.target.value);
    };
    const onChangeInputPassword = (e) => {
        setPassword(password = e.target.value);
    };
    const redirect = ()=>{
        window.location.assign('/login');
    }
    const registerHandler = async ()=>{
        let a = document.getElementsByClassName("log_text")[0].value
        let ab = document.getElementsByClassName("pwd_text")[0].value
        alert(a + " : " + ab)
        if(login === "")
            setLogin(a)
        if(password === "")
            setPassword(ab)
        try{
            await request('/api/auth/register','POST',{
                email:a,
                password:ab
            });
        }catch (e) {
            let error = e.toString().split(":")[1]
            clearFields()
            setError(error)
            console.log(Error)
        }
    }
    const  clearFields =  () => {
        setError("")
        setPassword("")
        setLogin("")
    }
    useEffect(()=>{
        const fetchData = async () => {
            if (active.active===false) {
                clearFields()
            }
        };

        fetchData();
    },[active])



    const LoginHandler = async () => {
        let a = document.getElementsByClassName("log_text")[0].value
        let ab = document.getElementsByClassName("pwd_text")[0].value
        alert(a + " : " + ab)
        if(login === "")
            setLogin(a)
        if(password === "")
            setPassword(ab)
        try {
            const data = await request('/api/auth/login', 'POST', {
                email:a,
                password:ab,
            })
            localStorage.setItem(storageName,JSON.stringify({
                UserID:data.userId, token:data.token,isAdmin:data.isAdmin
            }))
            redirect()
            const d = JSON.parse(localStorage.getItem(storageName))

        } catch (e) {
            let error = e.toString().split(":")[1]
            clearFields()
            setError(error)
            console.log(Error)
        }
    }





    const onSubmitForm = (evt) =>{
        evt.preventDefault();
    };
    let props;
    return (
        <div className="login">
            <div className="login__inner">

                <form className="login__form" action="" onSubmit={onSubmitForm}>
                    <h5 className="error">{Error}</h5>
                    <LoginInput className="text1_"  clear={!active.active}  name="Логин"  onChangeInputValue={onChangeInputLogin}/>
                    <PasswordInput className="text1" clear={!active.active} name="Пароль" onChangeInputValue={onChangeInputPassword}/>
                    <div className="buttons">
                        <button className="button reg__button" type="submit"
                                onClick={registerHandler}
                        >Регистрация
                        </button>
                        <button className="button login__button" type="submit"
                                onClick={LoginHandler}
                        >Войти
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
    
};
export default Login;