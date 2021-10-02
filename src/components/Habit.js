import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { createHabitRequest, deleteHabitRequest } from "../trackitRequests";
import {
    Button,
    SubmitButton,
    HabitContainer,
    Input,
} from "./shared/stylesApp";
import { TrashOutline } from "react-ionicons";
import UpdateContext from "../contexts/UpdateContext";

function Day({ dayNumber, dayName, newHabit, setNewHabit, isSelected }) {
    const [selected, setSelected] = useState(isSelected);

    function addDay(day, event) {
        event.preventDefault();
        if (!selected) {
            setSelected(true);
            setNewHabit({ ...newHabit, days: [...newHabit.days, day] });
        } else {
            setSelected(false);
            let daysClone = newHabit.days.filter((item) => item !== day);
            setNewHabit({ ...newHabit, days: [...daysClone] });
        }
    }

    return (
        <DayContainer
            onClick={(event) => addDay(dayNumber, event)}
            selected={selected}
        >
            {dayName}
        </DayContainer>
    );
}
//generates form for creating a new habit
function HabitForm({ setInsertHabit, newHabit, setNewHabit }) {
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(UserContext);
    const week = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
    const { setUpdate, update } = useContext(UpdateContext);

    function createHabit(event) {
        event.preventDefault();
        if (newHabit.name.length > 0 && newHabit.days.length > 0) {
            setDisabled(true);
            create();
        } else {
            alert("Choose at least one day in order to submit your habit");
        }
    }

    function create() {
        createHabitRequest(newHabit, user.token)
            .then((response) => {
                setInsertHabit(null);
                setNewHabit({ name: "", days: [] });
                setUpdate(update + 1);
            })
            .catch((error) => {
                alert("An error occurred. Please, refresh the page.");
                setDisabled(false);
            });
    }

    return (
        <HabitContainer>
            <form onSubmit={createHabit}>
                <fieldset disabled={disabled}>
                    <Input
                        placeholder="habit name"
                        value={newHabit.name}
                        onChange={(e) =>
                            setNewHabit({ ...newHabit, name: e.target.value })
                        }
                        required
                    />
                    <DaysContainer>
                        {Object.keys(week).map((dayName, index) => (
                            <Day
                                dayNumber={week[dayName]}
                                dayName={dayName[0]}
                                key={index}
                                newHabit={newHabit}
                                setNewHabit={setNewHabit}
                                isSelected={newHabit.days.some(
                                    (item) => item === week[dayName]
                                )}
                            />
                        ))}
                    </DaysContainer>
                    <div className="buttons">
                        <Button
                            width="84px"
                            height="35px"
                            className="cancel"
                            onClick={() => setInsertHabit(false)}
                        >
                            Cancel
                        </Button>
                        <SubmitButton
                            type="submit"
                            width="84px"
                            height="35px"
                            disabled={disabled}
                        >
                            Save
                        </SubmitButton>
                    </div>
                </fieldset>
            </form>
        </HabitContainer>
    );
}

//generates a habit card with a delete button
function Habit({ habitData }) {
    const { user } = useContext(UserContext);
    const { setUpdate, update } = useContext(UpdateContext);
    const week = { Seg: 1, Ter: 2, Quar: 3, Quin: 4, Sex: 5, Sab: 6, Dom: 0 };

    function deleteHabit(id) {
        let confirmation = window.confirm(
            "Do you really want to delete this habit? This action can't be undone"
        );

        if (confirmation) {
            deleteHabitRequest(id, user.token)
                .then(() => setUpdate(update + 1))
                .catch(() =>
                    alert(
                        "An error occurred. Your habit wasn't deleted. Please, try again in a few moments."
                    )
                );
            return;
        }

        return;
    }

    return (
        <HabitContainer>
            <div className="top-container">
                <h1>{habitData.name} </h1>

                <TrashOutline
                    color={"#666666"}
                    height="20px"
                    width="20px"
                    onClick={() => deleteHabit(habitData.id)}
                />
            </div>
            <DaysContainer>
                {Object.keys(week).map((dayName, index) => (
                    <DayContainer
                        selected={habitData.days.some(
                            (item) => item === week[dayName]
                        )}
                        key={index}
                    >
                        {" "}
                        {dayName[0]}{" "}
                    </DayContainer>
                ))}
            </DaysContainer>
        </HabitContainer>
    );
}

export { Habit, HabitForm };

const DaysContainer = styled.div`
    width: 100%;
    margin: 7px 0;
`;

const DayContainer = styled.button`
    height: 30px;
    width: 30px;
    margin-right: 5px;
    background-color: ${(props) =>
        props.selected ? "#CFCFCF" : "transparent"};
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    color: ${(props) => (props.selected ? "#fff" : "#d4d4d4")};
    font-size: 18px;
`;
