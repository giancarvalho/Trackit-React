import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import BottomBar from "../components/BottomBar";
import { Checkbox } from "react-ionicons";
import {
    Main,
    HabitsContainer,
    Title,
    HabitContainer,
} from "../components/shared/stylesApp";
import TopBar from "../components/TopBar";
import { useHistory } from "react-router";
import getFormatedDate from "../scripts/getFormatedDate";
import {
    checkHabitRequest,
    getTodayHabitList,
} from "../services/trackitRequests";

//generates a today habit card
function TodayHabit({ habit, user }) {
    const [checked, setChecked] = useState(habit.done);
    console.log(habit);
    return (
        <TodayHabitContainer>
            <div>
                <h1>{habit.name}</h1>
                <p>
                    Current streak: <span>{habit.currentSequence} days</span>
                </p>
                <p>
                    Your record:
                    <span> {habit.highestSequence} days</span>{" "}
                </p>
            </div>
            <Checkbox
                color={checked ? "#8FC549" : "#E7E7E7"}
                height="100px"
                width="100px"
                onClick={() => setChecked(!checked)}
            />
        </TodayHabitContainer>
    );
}

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
                            <TodayHabit habit={habit} user={user} key={index} />
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

const TodayHabitContainer = styled(HabitContainer)`
    display: flex;
    justify-content: space-between;
    padding: 13px;

    p {
        font-size: 13px;
        line-height: 17px;
    }

    .done {
        color: #8fc549;
    }
`;
