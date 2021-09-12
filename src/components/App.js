import "../reset.css";
import "../global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "./Home";
import SignUp from "./SignUp";
import MyHabits from "./MyHabits";
import Today from "./Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState, useEffect } from "react";
import ProgressContext from "../contexts/ProgressContext";
import { getTodayHabitList } from "../trackitRequests";

function App() {
  const [user, setUser] = useState(getStoredUser());
  const [todayProgress, setTodayProgress] = useState({
    progress: 0,
    update: 0,
  });
  const [todayList, setTodayList] = useState([]);

  function getStoredUser() {
    let storedUser = localStorage.getItem("storedUser");
    storedUser = JSON.parse(storedUser);

    return storedUser;
  }

  useEffect(() => {
    getTodayHabitList(user.token).then((response) => {
      let list = response.data;
      list = list.sort().reverse();
      setTodayList(list);
      calculateProgress(list);
    });
  }, [todayProgress]);

  function calculateProgress(habitList) {
    let doneTask = habitList.filter((item) => item.done);
    let donePercentage = (doneTask.length / habitList.length) * 100;

    setTodayProgress({ ...todayProgress, progress: donePercentage });
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
                <Today todayList={todayList} setTodayList={setTodayList} />
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
