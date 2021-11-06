import "../styles/reset.css";
import "../styles/global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import Today from "../views/Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import History from "../views/History";
import Habits from "../views/Habits";

function App() {
    const [user, setUser] = useState("");

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/signup" exact>
                            <SignUp />
                        </Route>

                        <Route path="/today" exact>
                            <Today />
                        </Route>
                        <Route path="/habits" exact>
                            <Habits />
                        </Route>
                        <Route path="/history" exact>
                            <History />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
