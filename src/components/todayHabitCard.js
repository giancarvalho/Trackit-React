import { HabitContainer } from "./shared/stylesApp";
import styled from "styled-components";
import { Checkbox } from "react-ionicons";
import { useState } from "react";

//generates a today habit card
export default function TodayHabitCard({ habit, user }) {
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
