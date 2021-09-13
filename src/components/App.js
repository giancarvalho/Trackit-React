import "../reset.css";
import "../global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "./Home";
import SignUp from "./SignUp";
import MyHabits from "./MyHabits";
import Today from "./Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressContext from "../contexts/ProgressContext";
import { getTodayHabitList } from "../trackitRequests";
import UpdateContext from "../contexts/UpdateContext";
import UserContext from "../contexts/UserContext";
import History from "./History";

function App() {
  const [user, setUser] = useState(getStoredUser());
  const [todayProgress, setTodayProgress] = useState({
    tasks: 0,
    tasksDone: 0,
  });
  const [todayList, setTodayList] = useState([]);
  //controls if habitList needs to be updated
  const [update, setUpdate] = useState(0);

  function getStoredUser() {
    let storedUser = localStorage.getItem("storedUser");
    storedUser = JSON.parse(storedUser);

    return storedUser;
  }

  useEffect(() => {
    if (user) {
      getTodayHabitList(user.token).then((response) => {
        let list = response.data;
        list = list.sort().reverse();
        setTodayList(list);
        //only updates if the change comes from page habitos
        if (list.length !== todayProgress.tasks) {
          updateProgress(list);
        }
      });
    }
  }, [update]);

  function updateProgress(habitList) {
    let tasks = habitList.length;
    let tasksDone = habitList.filter((item) => item.done).length;

    setTodayProgress({ tasks: tasks, tasksDone: tasksDone });
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
              <UpdateContext.Provider value={{ update, setUpdate }}>
                <Route path="/hoje" exact>
                  <Today todayList={todayList} />
                </Route>
                <Route path="/habitos" exact>
                  <MyHabits />
                </Route>
                <Route path="/historico" exact>
                  <History />
                </Route>
              </UpdateContext.Provider>
            </ProgressContext.Provider>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
