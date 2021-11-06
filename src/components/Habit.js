import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { HabitContainer } from "./shared/stylesApp";
import { TrashOutline } from "react-ionicons";
import { deleteHabitRequest } from "../services/trackitRequests";
import { DaysContainer, DayContainer } from "./shared/stylesApp";

//generates a habit card with a delete button
function Habit({ habitData, updateHabitList }) {
    const { user } = useContext(UserContext);
    const week = { Seg: 1, Ter: 2, Quar: 3, Quin: 4, Sex: 5, Sab: 6, Dom: 0 };

    function deleteHabit() {
        let confirmation = window.confirm(
            "Do you really want to delete this habit? This action can't be undone"
        );
        const targetHabit = habitData;
        updateHabitList(targetHabit);

        if (confirmation) {
            deleteHabitRequest(targetHabit.id, user.token).catch(() => {
                updateHabitList(targetHabit, "add");
                alert(
                    "An error occurred. Your habit wasn't deleted. Please, try again in a few moments."
                );
            });
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

export { Habit };
