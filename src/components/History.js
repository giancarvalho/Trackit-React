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
import getFormatedDate from "../scripts/getFormatedDate";

export default function History() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [value, onChange] = useState(new Date());
    const [habitList, setHabitList] = useState(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [dayHabits, setDayHabits] = useState({ day: "", habits: [] });

    useEffect(() => {
        getHistory(user.token)
            .then((response) => setHabitList(response.data))
            .catch((error) => console.log(error));
    }, []);

    if (!user) {
        history.push("/");
        return "Redirecionando...";
    }

    function getDay(date) {
        const day = dayjs(date).format("DD/MM/YYYY");

        let dayData = habitList.find((date) => date.day === day);

        return dayData;
    }

    function decideClass(date) {
        const dayData = getDay(date);

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

    function showHabitsOnClickedDay(date) {
        const dayData = getDay(date);

        if (!dayData) {
            return;
        }

        const day = getFormatedDate(date);
        setIsPopUpOpen(true);

        setDayHabits({ day, habits: dayData.habits });
    }

    return (
        <>
            <TopBar />
            <Main>
                <TitleContainer>
                    <Title>Historico</Title>
                </TitleContainer>

                <HabitsCalendarContainer>
                    {habitList ? (
                        <Calendar
                            value={value}
                            onChange={onChange}
                            locale="pt-br"
                            formatDay={(locale, date) => (
                                <CustomDay className={decideClass(date)}>
                                    {date.getDate()}
                                </CustomDay>
                            )}
                            onClickDay={(value, event) =>
                                showHabitsOnClickedDay(value)
                            }
                        />
                    ) : (
                        <LoaderContainer>
                            <Loader
                                type="ThreeDots"
                                color="#52B6FF"
                                height={75}
                                width={75}
                            />
                        </LoaderContainer>
                    )}
                    {isPopUpOpen && (
                        <PopUpContainer isPopUpOpen={isPopUpOpen}>
                            <h1>{dayHabits.day}</h1>
                            <ul>
                                {dayHabits.habits.map((day, index) => (
                                    <li key={index}>{day.name}</li>
                                ))}
                            </ul>
                        </PopUpContainer>
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

    &:hover,
    &:hover.complete,
    &:hover.incomplete {
        background-color: #1087ff;
        color: #fff;
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const PopUpContainer = styled.div`
    position: fixed;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 40vh;
    width: 80vw;
    background-color: #fff;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.15);
    padding: 20px;
    color: #666666;

    h1 {
        font-size: 20px;
        color: #126ba5;
        margin-bottom: 15px;
    }

    li {
        margin-bottom: 8px;
    }
`;
