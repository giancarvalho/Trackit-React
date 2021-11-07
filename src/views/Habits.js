import { useContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { Habit } from "../components/Habit";
import HabitForm from "../components/HabitForm";
import UserContext from "../contexts/UserContext";
import { getHabitList } from "../services/trackitRequests";
import {
    Button,
    HabitsContainer,
    Title,
    Main,
} from "../components/shared/stylesApp";
import TodayListContext from "../contexts/TodayListContext";

export default function Habits() {
    const { user } = useContext(UserContext);
    const { todayList, setTodayList } = useContext(TodayListContext);
    const [insertHabit, setInsertHabit] = useState(false);
    const [habitList, setHabitList] = useState(null);
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });
    const today = new Date().getDay();
    console.log(newHabit);
    useEffect(() => {
        if (user) {
            getHabitList(user.token).then((response) => {
                let list = response.data;
                list = list.sort().reverse();
                setHabitList(list);
            });
        }
    }, [user]);

    //opens and closes create habit form
    function switchHabitForm() {
        setInsertHabit(!insertHabit);
    }

    function updateHabitList(targetHabit, operation) {
        if (operation === "add") {
            setHabitList((habitList) => [targetHabit, ...habitList]);

            return;
        }

        deleteFromTodayList(targetHabit);
        setHabitList(habitList.filter((habit) => habit.id !== targetHabit.id));
    }

    function deleteFromTodayList(targetHabit) {
        if (targetHabit.days.includes(today)) {
            setTodayList(
                todayList.filter((habit) => habit.id !== targetHabit.id)
            );
        }
    }

    //returns a list of habit cards or a message if list is empty
    function ListOrMessage() {
        return habitList.length > 0 ? (
            habitList.map((habit, index) => (
                <Habit
                    habitData={habit}
                    key={index}
                    updateHabitList={updateHabitList}
                />
            ))
        ) : (
            <p>
                You haven't added any habits yet. Add a habit to start tracking!
            </p>
        );
    }

    return (
        <Main>
            <TitleContainer>
                <Title>My habits</Title>
                <Button width="40px" height="35px" onClick={switchHabitForm}>
                    +
                </Button>
            </TitleContainer>

            <HabitsContainer>
                {insertHabit && (
                    <HabitForm
                        switchHabitForm={switchHabitForm}
                        newHabit={newHabit}
                        setNewHabit={setNewHabit}
                        updateHabitList={updateHabitList}
                    />
                )}

                {habitList ? (
                    <ListOrMessage />
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
            </HabitsContainer>
        </Main>
    );
}

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const LoaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
