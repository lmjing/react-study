import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigator from "components/Navigator";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            {isLoggedIn && <Navigator userName={userObj.displayName} />}
            <Switch>
                {
                    isLoggedIn ?
                        <>
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile userObj={userObj} refreshUser={refreshUser} />
                            </Route>
                        </>
                        : <Route exact path="/">
                            <Auth />
                        </Route>
                }
            </Switch>
        </Router>);
}

export default AppRouter;