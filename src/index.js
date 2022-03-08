import React, {Component} from "react";
import * as ReactDOM from "react-dom";
import {Authorization} from "./authorizationPage";
import {MainPage} from "./mainPage";
import {Roadmap1} from "./roadmap1";
import {Registration} from "./registrationPage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router-dom";

class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/"  component={Authorization}/>
                    <Route exact path="/main" component={MainPage}/>
                    <Route exact path="/main/roadmap1" component={Roadmap1}/>
                    <Route exact path="/registration" component={Registration}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))
