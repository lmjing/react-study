import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigator from "components/Navigaton";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigator userName={userObj.displayName} />}
            <Switch>
                <>
                    {
                        isLoggedIn ? (
                            <div
                                style={{
                                    maxWidth: 890,
                                    width: "100%",
                                    margin: "0 auto",
                                    marginTop: 80,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Route exact path="/">
                                    <Home userObj={userObj} />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile userObj={userObj} refreshUser={refreshUser} />
                                </Route>
                            </div>
                        ) : (
                            <>
                                <Route exact path="/">
                                    <Auth />
                                </Route>
                            </>
                        )
                    }
                </>
            </Switch>
        </Router>);
}

export default AppRouter;