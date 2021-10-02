import { useContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import styled from "styled-components";
import UpdateContext from "../contexts/UpdateContext";
import UserContext from "../contexts/UserContext";
import { getHabitList } from "../trackitRequests";
import BottomBar from "./BottomBar";
import { Habit, HabitForm } from "./Habit";
import { Button, HabitsContainer, Title, Main } from "./shared/stylesApp";
import TopBar from "./TopBar";

export default function Habits() {
    const [insertHabit, setInsertHabit] = useState(false);
    const [habitList, setHabitList] = useState(null);
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });
    const { update } = useContext(UpdateContext);
    const { user } = useContext(UserContext);
    const history = useHistory();

    //opens and closes create habit form
    function addHabit() {
        if (!insertHabit) {
            setInsertHabit(true);
        } else {
            setInsertHabit(null);
        }
    }

    useEffect(() => {
        if (user) {
            getHabitList(user.token).then((response) => {
                let list = response.data;
                list = list.sort().reverse();
                setHabitList(list);
            });
        }
    }, [update]);

    if (!user) {
        history.push("/");
        return "Redirecionando...";
    }

    //returns a list of habit cards or a message if list is empty
    function ListOrMessage() {
        return habitList.length > 0 ? (
            habitList.map((habit, index) => (
                <Habit habitData={habit} key={index} />
            ))
        ) : (
            <p>
                You haven't added any habits yet. Add a habit to start tracking!
            </p>
        );
    }

    return (
        <>
            <TopBar />
            <Main>
                <TitleContainer>
                    <Title>My habits</Title>
                    <Button
                        width="40px"
                        height="35px"
                        onClick={() => addHabit()}
                    >
                        +
                    </Button>
                </TitleContainer>

                <HabitsContainer>
                    {insertHabit && (
                        <HabitForm
                            setInsertHabit={setInsertHabit}
                            newHabit={newHabit}
                            setNewHabit={setNewHabit}
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
            <BottomBar />
        </>
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