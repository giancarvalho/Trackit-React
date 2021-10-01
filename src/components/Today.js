import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import BottomBar from "./BottomBar";
import { Checkbox } from "react-ionicons";
import {
    Main,
    HabitsContainer,
    Title,
    HabitContainer,
} from "./shared/stylesApp";
import TopBar from "./TopBar";
import { checkHabitRequest } from "../trackitRequests";
import ProgressContext from "../contexts/ProgressContext";
import UpdateContext from "../contexts/UpdateContext";
import { useHistory } from "react-router";
import getFormatedDate from "../scripts/getFormatedDate";

//generates a today habit card
function TodayHabit({ habit, user }) {
    const [checked, setChecked] = useState(habit.done);
    const { update, setUpdate } = useContext(UpdateContext);
    const { todayProgress, setTodayProgress } = useContext(ProgressContext);
    //controls habit values locally to decrease animation delay
    const [habitClone, setHabitClone] = useState({ ...habit });

    function checkHabit(id) {
        if (!habit.done) {
            setChecked(true);
            updateValues("+");
            checkHabitRequest(id, "check", user.token)
                .then(() => setUpdate(update + 1))
                .catch(() => {
                    alert("Ocorreu um problema. Tente Novamente");
                });
            return;
        }

        updateValues("-");
        setChecked(false);
        checkHabitRequest(id, "uncheck", user.token)
            .then(() => setUpdate(update + 1))
            .catch(() => {
                alert("Ocorreu um problema. Tente Novamente");
            });
    }

    //updates Clone and Progress values
    function updateValues(operation) {
        const isEqualSequence =
            habitClone.currentSequence === habitClone.highestSequence;
        let newSequenceValue = habitClone.currentSequence;
        let newProgressValue = todayProgress.tasksDone;

        if (operation === "+") {
            newSequenceValue++;
            newProgressValue++;
        } else {
            newSequenceValue--;
            newProgressValue--;
        }

        updateClone(newSequenceValue, isEqualSequence);
        updateProgress(newProgressValue);
    }

    function updateClone(newValue, equal) {
        if (equal) {
            setHabitClone({
                ...habitClone,
                currentSequence: newValue,
                highestSequence: newValue,
                done: !habitClone.done,
            });
        } else {
            setHabitClone({
                ...habitClone,
                currentSequence: newValue,
                done: !habitClone.done,
            });
        }
    }

    //updates progress directly to decrease animation delay
    function updateProgress(newValue) {
        setTodayProgress({
            ...todayProgress,
            tasksDone: newValue,
        });
    }

    return (
        <TodayHabitContainer>
            <div>
                <h1>{habitClone.name}</h1>
                <p>
                    Current streak:{" "}
                    <span className={habitClone.done ? "done" : ""}>
                        {habitClone.currentSequence} dias
                    </span>
                </p>
                <p>
                    Your record:{" "}
                    <span
                        className={
                            habitClone.highestSequence ===
                                habitClone.currentSequence &&
                            habitClone.highestSequence > 0
                                ? "done"
                                : ""
                        }
                    >
                        {habitClone.highestSequence} dias
                    </span>{" "}
                </p>
            </div>
            <Checkbox
                color={checked ? "#8FC549" : "#E7E7E7"}
                height="100px"
                width="100px"
                onClick={() => checkHabit(habit.id)}
            />
        </TodayHabitContainer>
    );
}

export default function Today({ todayList }) {
    let { user } = useContext(UserContext);
    const { todayProgress } = useContext(ProgressContext);
    const progress = (todayProgress.tasksDone / todayProgress.tasks) * 100;
    const history = useHistory();

    if (!user) {
        history.push("/");
        return "Redirecionando...";
    }

    return (
        <>
            <TopBar />
            <Main>
                <TitleContainer>
                    <Title>{getFormatedDate()}</Title>
                    {progress === 0 || isNaN(progress) ? (
                        <p>No habits were done yet</p>
                    ) : (
                        <p className="done">
                            {progress.toFixed()}% habits done
                        </p>
                    )}
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
