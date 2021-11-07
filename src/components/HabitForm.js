import { useState } from "react";
import { createHabitRequest } from "../services/trackitRequests";
import { Button, Input, SubmitButton } from "./shared/stylesApp";
import { HabitContainer } from "./shared/stylesApp";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { DaysContainer, DayContainer } from "./shared/stylesApp";
import TodayListContext from "../contexts/TodayListContext";
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

export default function HabitForm({
    switchHabitForm,
    newHabit,
    setNewHabit,
    updateHabitList,
}) {
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(UserContext);
    const { setTodayList } = useContext(TodayListContext);
    const week = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
    const today = new Date().getDay();

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
        updateHabitList(newHabit, "add");
        createHabitRequest(newHabit, user.token)
            .then((response) => {
                switchHabitForm();
                updateTodayList(response.data);
                setNewHabit({ name: "", days: [] });
            })
            .catch((error) => {
                alert("An error occurred. Please, refresh the page.");
                setDisabled(false);
            });
    }

    function updateTodayList(habit) {
        if (habit.days.includes(today)) {
            setTodayList((todayList) => [
                { ...habit, currentSequence: 0, highestSequence: 0 },
                ...todayList,
            ]);
        }
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
                            onClick={switchHabitForm}
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
