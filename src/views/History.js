import BottomBar from "../components/BottomBar";
import { HabitsContainer, Main, Title } from "../components/shared/stylesApp";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../components/StylesHistory";
import { HabitsCalendarContainer } from "../components/StylesHistory";
import Loader from "react-loader-spinner";
import dayjs from "dayjs";
import getFormatedDate from "../scripts/getFormatedDate";
import { Button } from "../components/shared/stylesApp";
import { getHistory } from "../services/trackitRequests";

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
        return "Redirecting...";
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

        return doneOrMissed(dayData);
    }

    function doneOrMissed(dayData) {
        const isHabitsMissed = dayData.habits.some(
            (habit) => habit.done === false
        );

        if (isHabitsMissed) {
            return "missed";
        }

        return "done";
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
                    <Title>History</Title>
                </TitleContainer>

                <HabitsCalendarContainer>
                    {habitList ? (
                        <Calendar
                            value={value}
                            onChange={onChange}
                            locale="en"
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
                            <div>
                                <h1>{dayHabits.day}</h1>
                                <ul>
                                    {dayHabits.habits.map((habit, index) => (
                                        <li
                                            key={index}
                                            className={
                                                habit.done ? "done" : "missed"
                                            }
                                        >
                                            {habit.done ? (
                                                <span>&#10003;</span>
                                            ) : (
                                                <span>&#9932;</span>
                                            )}{" "}
                                            {habit.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button
                                height="20%"
                                width="70%"
                                onClick={() => setIsPopUpOpen(false)}
                            >
                                Go back
                            </Button>
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

    &.done {
        background-color: #8ac353;
    }

    &.missed {
        background-color: #e85665;
    }

    &:hover,
    &:hover.done,
    &:hover.missed {
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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

    .done {
        color: #8ac353;
    }

    .missed {
        color: #e85665;
    }
`;
