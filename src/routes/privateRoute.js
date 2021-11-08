import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { getTodayHabitList } from "../services/trackitRequests";
import TodayListContext from "../contexts/TodayListContext";
import { useLocation } from "react-router";

export default function PrivateRoute({ element: Element, path, ...rest }) {
    const { user } = useContext(UserContext);
    const [todayList, setTodayList] = useState([]);
    const location = useLocation();
    const isTodayPage = location.pathname === "/today";

    useEffect(() => {
        if (user.token) {
            getTodayHabitList(user.token).then((response) => {
                let list = response.data;
                list = list.sort().reverse();
                setTodayList(list);
            });
        }
    }, [user, isTodayPage]);

    return (
        <Route exact path={path}>
            {user.token ? (
                <TodayListContext.Provider value={{ todayList, setTodayList }}>
                    <TopBar />
                    <Element {...rest} />
                    <BottomBar todayList={todayList} />
                </TodayListContext.Provider>
            ) : (
                <Redirect to="/" />
            )}
        </Route>
    );
}
