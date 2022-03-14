import {makeAutoObservable} from "mobx";

class Auth{
    isAuth: false;

    constructor() {
        makeAutoObservable(this)
    }
    changeAuth(){
        this.isAuth = !this.isAuth
    }

}
export default new Auth()