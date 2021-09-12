import "../reset.css";
import "../global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "./Home";
import SignUp from "./SignUp";
import MyHabits from "./MyHabits";
import Today from "./Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import ProgressContext from "../contexts/ProgressContext";

function App() {
  const [user, setUser] = useState(getStoredUser());
  const [todayProgress, setTodayProgress] = useState(0);
  function getStoredUser() {
    let storedUser = localStorage.getItem("storedUser");
    storedUser = JSON.parse(storedUser);

    return storedUser;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/cadastro" exact>
              <SignUp />
            </Route>
            <ProgressContext.Provider
              value={{ todayProgress, setTodayProgress }}
            >
              <Route path="/hoje" exact>
                <Today />
              </Route>
              <Route path="/habitos" exact>
                <MyHabits />
              </Route>
            </ProgressContext.Provider>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
