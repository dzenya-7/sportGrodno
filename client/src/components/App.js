import './styles/App.css';
import {useRoutes} from '../routes'
import {useAuth} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {BrowserRouter as Router} from "react-router-dom";
import { Helmet } from 'react-helmet'
import Header from "./header/Header";
import Footer from "./Footer";

const storageName = 'userData'
function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    let isAdmin = false
    const d = JSON.parse(localStorage.getItem(storageName))
    if(d!=null){
        isAdmin = d.isAdmin
    }
    const routes = useRoutes(isAuthenticated,isAdmin)
    return (

        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=0.7"/>
            </Helmet>

            <Router>
                {
                    isAuthenticated
                }
                <div className="m-cont">
                    <Header/>
                    <div className="container">
                        {

                            routes
                        }
                    </div>
                    <Footer/>
                </div>

            </Router>
        </AuthContext.Provider>

    )
}

export default App;