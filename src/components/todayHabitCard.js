import { HabitContainer } from "./shared/stylesApp";
import styled from "styled-components";
import { Checkbox } from "react-ionicons";
import { useState } from "react";
import { checkHabitRequest } from "../services/trackitRequests";

//generates a today habit card
export default function TodayHabitCard({ habit, user }) {
    const [checked, setChecked] = useState(habit.done);
    const [sequences, setSequences] = useState({
        current: habit.currentSequence,
        highest: habit.highestSequence,
    });

    function checkHabit() {
        const operation = checked ? "uncheck" : "check";
        setChecked(!checked);
        recalcSequences(operation);

        checkHabitRequest(habit.id, operation, user.token).catch((error) => {
            setChecked(!checked);
            alert(
                "Sorry, we are having problems reaching our server. Reload the page and try again"
            );
        });
    }

    function recalcSequences(operation) {
        if (operation === "check") {
            const newSequence = sequences.current + 1;
            if (newSequence >= sequences.highest) {
                setSequences({ current: newSequence, highest: newSequence });
                return;
            }

            setSequences({ ...sequences, current: newSequence });
            return;
        }

        setSequences({
            current: sequences.current - 1,
            highest: habit.highestSequence,
        });
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
