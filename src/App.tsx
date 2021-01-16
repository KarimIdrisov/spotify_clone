import React from 'react';
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import WebPlayer from "./Pages/WebPlayer";
import Account from "./Pages/Account";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/account" component={Account}/>
                    <Route path="/player/search" component={WebPlayer}/>
                    <Route path="/player" component={WebPlayer}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        </div>
    );
}