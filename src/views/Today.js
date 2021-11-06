import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import BottomBar from "../components/BottomBar";

import { Main, HabitsContainer, Title } from "../components/shared/stylesApp";
import TopBar from "../components/TopBar";
import { useHistory } from "react-router";
import getFormatedDate from "../scripts/getFormatedDate";
import { getTodayHabitList } from "../services/trackitRequests";
import TodayHabitCard from "../components/todayHabitCard";

export default function Today() {
    let { user } = useContext(UserContext);
    const [todayList, setTodayList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getTodayHabitList(user.token).then((response) => {
                let list = response.data;
                list = list.sort().reverse();
                setTodayList(list);
            });
        }
    }, []);

    if (!user) {
        history.push("/");
        return "Redirecting...";
    }

    return (
        <>
            <TopBar />
            <Main>
                <TitleContainer>
                    <Title>{getFormatedDate()}</Title>
                </TitleContainer>
                <HabitsContainer>
                    {todayList.length === 0 ? (
                        <p>
                            No habits added for today. Add a new one on your
                            Habits page ;)
                        </p>
                    ) : (
                        todayList.map((habit, index) => (
                            <TodayHabitCard
                                habit={habit}
                                user={user}
                                key={index}
                            />
                        ))
                    )}
                </HabitsContainer>
            </Main>
            <BottomBar />
        </>
    );
}

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    width: 100%;

    p {
        font-size: 18px;
        color: #bababa;
        margin-top: 8px;
    }

    .done {
        color: #8fc549;
    }
`;
