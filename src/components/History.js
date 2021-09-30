import BottomBar from "./BottomBar";
import { HabitsContainer, Main, Title } from "./shared/stylesApp";
import TopBar from "./TopBar";
import styled from "styled-components";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./StylesHistory";
import { HabitsCalendarContainer } from "./StylesHistory";
import { getHistory } from "../trackitRequests";
import Loader from "react-loader-spinner";
import dayjs from "dayjs";
export default function History() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [habitList, setHabitList] = useState([]);

    useEffect(() => {
        getHistory(user.token)
            .then((response) => setHabitList(response.data))
            .catch((error) => console.log(error));
    }, []);

    if (!user) {
        history.push("/");
        return "Redirecionando...";
    }

    function decideClass(date) {
        const day = dayjs(date).format("DD/MM/YYYY");

        let dayData = habitList.find((date) => date.day === day);

        if (!dayData) {
            return "";
        }

        return completeOrIncomplete(dayData);
    }

    function completeOrIncomplete(dayData) {
        const areHabitsIncomplete = dayData.habits.some(
            (habit) => habit.done === false
        );

        if (areHabitsIncomplete) {
            return "incomplete";
        }

        return "complete";
    }

    return (
        <>
            <TopBar />
            <Main>
                <TitleContainer>
                    <Title>Historico</Title>
                </TitleContainer>

                <HabitsCalendarContainer>
                    {habitList.length === 0 ? (
                        <LoaderContainer>
                            <Loader
                                type="ThreeDots"
                                color="#52B6FF"
                                height={75}
                                width={75}
                            />
                        </LoaderContainer>
                    ) : (
                        <Calendar
                            value={date}
                            onChange={setDate}
                            locale="pt-br"
                            formatDay={(locale, date) => (
                                <CustomDay className={decideClass(date)}>
                                    {date.getDate()}
                                </CustomDay>
                            )}
                        />
                    )}
                </HabitsCalendarContainer>
            </Main>
            <BottomBar />
        </>
    );
}

const TitleContainer = styled.div`
    width: 100%;
    margin: 10px 0 20px;
`;

const CustomDay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    border-radius: 100%;

    &.complete {
        background-color: #8ac353;
    }

    &.incomplete {
        background-color: #e85665;
    }
    &:enabled,
    &:hover {
        background-color: #1087ff;
        color: white;
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
