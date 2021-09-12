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
import ProgressContext from "../contexts/ProgressContext";

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

function HabitForm({ setInsertHabit, newHabit, setNewHabit }) {
  const [disabled, setDisabled] = useState(false);
  const { user } = useContext(UserContext);
  const week = { Seg: 1, Ter: 2, Quar: 3, Quin: 4, Sex: 5, Sab: 6, Dom: 0 };
  const { setTodayProgress, todayProgress } = useContext(ProgressContext);

  function createHabit(event) {
    event.preventDefault();
    if (newHabit.name.length > 0 && newHabit.days.length > 0) {
      setDisabled(true);
      createHabitRequest(newHabit, user.token)
        .then((response) => {
          setInsertHabit(null);
          setNewHabit({ name: "", days: [] });
          setTodayProgress({
            ...todayProgress.progress,
            update: todayProgress.update + 1,
          });
        })
        .catch((error) => {
          alert("ocorreu um erro. Tente novamente.");
          setDisabled(false);
        });
    } else {
      alert("Atribua pelo menos um dia ao seu habito");
    }
  }

  return (
    <HabitContainer>
      <form onSubmit={createHabit}>
        <fieldset disabled={disabled}>
          <Input
            placeholder="nome do hábito"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
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
              className="cancelar"
              onClick={() => setInsertHabit(false)}
            >
              Cancelar
            </Button>
            <SubmitButton
              type="submit"
              width="84px"
              height="35px"
              disabled={disabled}
            >
              Salvar
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </HabitContainer>
  );
}

function Habit({ habitData }) {
  const { user } = useContext(UserContext);
  const { setTodayProgress, todayProgress } = useContext(ProgressContext);
  const week = { Seg: 1, Ter: 2, Quar: 3, Quin: 4, Sex: 5, Sab: 6, Dom: 0 };

  function deleteHabit(id) {
    let confirmation = window.confirm("Quer mesmo deletar esse habito?");

    if (confirmation) {
      deleteHabitRequest(id, user.token)
        .then(() =>
          setTodayProgress({
            ...todayProgress.progress,
            update: todayProgress.update + 1,
          })
        )
        .catch(() => alert("Ocorreu um erro. Tente novamente."));
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
            selected={habitData.days.some((item) => item === week[dayName])}
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
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "transparent")};
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  color: ${(props) => (props.selected ? "#fff" : "#d4d4d4")};
  font-size: 18px;
`;
