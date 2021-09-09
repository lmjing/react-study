import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
    return (
        <HashRouter>
            <Route path="/" component={Home} exact={true}></Route>
            <Route path="/about" component={About}></Route>
        </HashRouter>
    )
}

export default App;