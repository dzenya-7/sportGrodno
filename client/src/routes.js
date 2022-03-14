import {Route} from "react-router";

import Main from "./pages/Main";
import UserPage from "./pages/UserPage";
import React from "react";
import Belarus_news from "./pages/Belarus_news";
import {Redirect, Switch} from "react-router-dom";
import Translation from "./pages/Translation";
import Schools from "./pages/Schools";
import Champions from "./pages/Champions";
import NewPage from "./pages/NewPage";
import AdminPage from "./pages/admin/AdminPage";
import EditPage from "./pages/admin/EditPage";
import SchoolPage from "./pages/SchoolPage";
import EditGoals from "./pages/admin/EditGoals";
import SchoolsList from "./pages/admin/SchoolsList";
import EditSchoolPage from "./pages/admin/editSchoolPage";
import NewsList from "./pages/admin/NewsList";
import EditNew from "./pages/admin/EditNew";
import GoalsList from "./pages/GoalsList";
import Goal from "./pages/Goal";

const url = "http://localhost:3000"
export const useRoutes = (isAuthenticated,isAdmin) => {
    try{
        if (isAuthenticated) {
            if(isAdmin){
                return (
                    <Switch>
                        <Redirect exact from="/" to="/home" />
                        <Route path="/champions" exact>
                            <Champions />
                        </Route>
                        <Route path="/goal/:id">
                            <Goal/>
                        </Route>

                        <Route path="/goalsList">
                            <GoalsList />
                        </Route>
                        <Route path="/editNew/:id">
                            <EditNew />
                        </Route>
                        <Route path="/newsList">
                            <NewsList />
                        </Route>
                        <Route path="/schoolsList">
                            <SchoolsList />
                        </Route>
                        <Route path="/editGoals">
                            <EditGoals />
                        </Route>
                        <Route path={"/basketball"}>
                            <Champions />
                        </Route>
                        <Route path="/newPage/:id">
                            <NewPage />
                        </Route>
                        <Route path="/editPage/:id">
                            <EditPage />
                        </Route>
                        <Route path="/editSchoolPage/:id">
                            <EditSchoolPage />
                        </Route>
                        <Route path="/schoolPage/:id">
                            <SchoolPage />
                        </Route>
                        <Route path="/schools" exact>
                            <Schools />
                        </Route>
                        <Route path="/translation" exact>
                            <Translation />
                        </Route>
                        <Route path="/login" >
                            <UserPage />
                        </Route>
                        <Route path="/football" >
                            <Belarus_news />
                        </Route>
                        <Route path="/home" >
                            {isAdmin}
                            <Main />
                        </Route>
                        <Route path="/admin" exact>
                            <AdminPage />
                        </Route>
                    </Switch>
                )
            }
            return (

                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/goal/:id">
                        <Goal/>
                    </Route>
                    <Route path="/goalsList">
                        <GoalsList />
                    </Route>
                    <Route path="/basketball" exact>
                        <Champions />
                    </Route>
                    <Route path="/newPage/:id">
                        <NewPage />
                    </Route>
                    <Route path="/hockey" exact>
                        <Schools />
                    </Route>
                    <Route path="/translation" exact>
                        <Translation />
                    </Route>
                    <Route path="/champions" exact>
                        <Champions />
                    </Route>
                    <Route path="/login" >
                        <UserPage />
                    </Route>
                    <Route path="/football" >
                        <Belarus_news />
                    </Route>
                    <Route path="/home" >
                        <Main />
                    </Route>
                    <Route path="/schoolPage/:id">
                        <SchoolPage />
                    </Route>
                    <Route path="/schools" exact>
                        <Schools />
                    </Route>
                </Switch>

            )
        }

        return (
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/goal/:id">
                    <Goal/>
                </Route>
                <Route path="/goalsList">
                    <GoalsList />
                </Route>
                <Route path="/home" >
                    <Main />
                </Route>
                <Route path="/champions" exact>
                    <Champions />
                </Route>
                <Route path="/newPage/:id">
                    <NewPage />
                </Route>
                <Route path="/hockey" exact>
                    <Schools />
                </Route>
                <Route path="/translation" exact>
                    <Translation />
                </Route>

                <Route path="/football" >
                    <Belarus_news />
                </Route>
                <Route path="/schoolPage/:id">
                    <SchoolPage />
                </Route>
                <Route path="/schools" exact>
                    <Schools />
                </Route>

            </Switch>

        )
    }
    catch (e) {
        console.log(e)
    }

}