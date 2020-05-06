import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import JourneyList from "./components/journeyList.component";
import EditJourney from "./components/editJourney.component";
import CreateJourney from "./components/createJourney.component";

import logo from "./logo.png";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="https://flexjourney.com" target="_blank">
                            <img src={logo} width="50" height="50" alt="nav" />
                        </a>
                        <Link to="/" className="navbar-brand">
                            Journey App
                        </Link>
                        <div className="navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">
                                        Journeys
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">
                                        Create Journey
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Route path="/" exact component={JourneyList} />
                    <Route path="/edit/:id" component={EditJourney} />
                    <Route path="/create" component={CreateJourney} />
                </div>
            </Router>
        );
    }
}

export default App;
