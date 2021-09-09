import "../reset.css";
import "../global.css";
import Home from "./Home";
import SignUp from "./SignUp";
import MyHabits from "./MyHabits";
import Today from "./Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={token}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Home setToken={setToken} />
            </Route>
            <Route path="/cadastro" exact>
              <SignUp />
            </Route>
            <Route path="/hoje" exact>
              <Today />
            </Route>
            <Route path="/habitos" exact>
              <MyHabits />
            </Route>
          </Switch>
        </div>
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
