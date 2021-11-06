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
import PrivateRoute from "../routes/privateRoute";

function App() {
    const [user, setUser] = useState({ token: null });

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

                        <PrivateRoute path="/today" element={Today} exact />

                        <PrivateRoute path="/habits" element={Habits} exact />

                        <PrivateRoute path="/history" element={History} exact />
                    </Switch>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
