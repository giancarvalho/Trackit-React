import "../styles/reset.css";
import "../styles/global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import Today from "../views/Today";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressContext from "../contexts/ProgressContext";
import { getTodayHabitList } from "../services/trackitRequests";
import UpdateContext from "../contexts/UpdateContext";
import UserContext from "../contexts/UserContext";
import History from "../views/History";
import Habits from "../views/Habits";

function App() {
    const [user, setUser] = useState("");
    const [todayProgress, setTodayProgress] = useState({
        tasks: 0,
        tasksDone: 0,
    });
    const [todayList, setTodayList] = useState([]);
    //controls if habitList needs to be updated
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        if (user) {
            getTodayHabitList(user.token).then((response) => {
                let list = response.data;
                list = list.sort().reverse();
                setTodayList(list);
                //only updates progress if the change comes from page my habits
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
                        <Route path="/signup" exact>
                            <SignUp />
                        </Route>
                        <ProgressContext.Provider
                            value={{ todayProgress, setTodayProgress }}
                        >
                            <UpdateContext.Provider
                                value={{ update, setUpdate }}
                            >
                                <Route path="/today" exact>
                                    <Today
                                        todayList={todayList}
                                        setTodayList={setTodayList}
                                    />
                                </Route>
                                <Route path="/habits" exact>
                                    <Habits />
                                </Route>
                                <Route path="/history" exact>
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
