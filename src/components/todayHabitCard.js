import { HabitContainer } from "./shared/stylesApp";
import styled from "styled-components";
import { Checkbox } from "react-ionicons";
import { useContext, useState } from "react";
import { checkHabitRequest } from "../services/trackitRequests";
import TodayListContext from "../contexts/TodayListContext";

export default function TodayHabitCard({ habit, user }) {
    const [checked, setChecked] = useState(habit.done);
    const { todayList, setTodayList } = useContext(TodayListContext);
    const [sequences, setSequences] = useState({
        current: habit.currentSequence,
        highest: habit.highestSequence,
    });

    function checkHabit() {
        const operation = checked ? "uncheck" : "check";
        setChecked(!checked);
        recalcSequences(operation);
        updateTodayList();

        checkHabitRequest(habit.id, operation, user.token).catch((error) => {
            setChecked(!checked);
            updateTodayList();
            alert(
                "Sorry, we are having problems reaching our server. Reload the page and try again"
            );
        });
    }

    function updateTodayList() {
        setTodayList(
            todayList.map((todayHabit) => {
                if (todayHabit.id === habit.id)
                    return {
                        ...todayHabit,
                        done: !checked,
                    };

                return todayHabit;
            })
        );
    }

    function recalcSequences(operation) {
        const newSequence =
            operation === "check"
                ? sequences.current + 1
                : sequences.current - 1;

        if (sequences.current >= sequences.highest) {
            setSequences({
                current: newSequence,
                highest: newSequence,
            });
        } else {
            setSequences({ ...sequences, current: newSequence });
        }
    }
    return (
        <TodayHabitContainer>
            <div>
                <h1>{habit.name}</h1>
                <p>
                    Current streak:{" "}
                    <span className={checked ? "done" : ""}>
                        {sequences.current} days
                    </span>
                </p>
                <p>
                    Your record:
                    <span
                        className={
                            sequences.highest === sequences.current &&
                            sequences.highest
                                ? "done"
                                : ""
                        }
                    >
                        {" "}
                        {sequences.highest} days
                    </span>{" "}
                </p>
            </div>
            <Checkbox
                color={checked ? "#8FC549" : "#E7E7E7"}
                height="100px"
                width="100px"
                onClick={checkHabit}
            />
        </TodayHabitContainer>
    );
}

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
