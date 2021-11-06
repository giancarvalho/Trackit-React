import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { Main, HabitsContainer, Title } from "../components/shared/stylesApp";
import getFormatedDate from "../scripts/getFormatedDate";
import TodayHabitCard from "../components/todayHabitCard";
import TodayListContext from "../contexts/TodayListContext";

export default function Today() {
    let { user } = useContext(UserContext);
    const { todayList } = useContext(TodayListContext);

    return (
        <Main>
            <TitleContainer>
                <Title>{getFormatedDate()}</Title>
            </TitleContainer>
            <HabitsContainer>
                {todayList.length === 0 ? (
                    <p>
                        No habits added for today. Add a new one on your Habits
                        page ;)
                    </p>
                ) : (
                    todayList.map((habit, index) => (
                        <TodayHabitCard habit={habit} user={user} key={index} />
                    ))
                )}
            </HabitsContainer>
        </Main>
    );
}

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;
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
