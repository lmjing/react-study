import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigator from "components/Navigator";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            {isLoggedIn && <Navigator></Navigator>}
            <Switch>
                {
                    isLoggedIn ?
                        <>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
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