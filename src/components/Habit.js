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

function Day({
  dayNumber,
  dayName,
  newHabit,
  setNewHabit,
  isSelected,
  created,
}) {
  const [selected, setSelected] = useState(false);

  console.log(dayNumber, dayName);

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

  if (created) {
    return <DayContainer selected={isSelected}> {dayName} </DayContainer>;
  }
  return (
    <DayContainer
      onClick={(event) => addDay(dayNumber, event)}
      selected={selected}
    >
      {" "}
      {dayName}{" "}
    </DayContainer>
  );
}

export default function Habit({ setInsertHabit, habitData, created }) {
  const [newHabit, setNewHabit] = useState({ name: "", days: [] });
  const [disabled, setDisabled] = useState(false);
  const { user } = useContext(UserContext);
  const week = { Seg: 1, Ter: 2, Quar: 3, Quin: 4, Sex: 5, Sab: 6, Dom: 0 };

  console.log(habitData);
  function createHabit(event) {
    event.preventDefault();
    if (newHabit.name.length > 0 && newHabit.days.length > 0) {
      setDisabled(true);
      createHabitRequest(newHabit, user.token)
        .then((response) => setInsertHabit(null))
        .catch((error) => {
          alert("ocorreu um erro. Tente novamente.");
          setDisabled(false);
        });
    } else {
      alert("escreva o nome do habito e selecione o dia para continuar");
    }
  }

  function deleteHabit(id) {
    let confirmation = window.confirm("Quer mesmo deletar esse habito?");

    if (confirmation) {
      deleteHabitRequest(id, user.token);
      return;
    }

    return;
  }

  if (created) {
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
            <Day
              dayNumber={week[dayName]}
              dayName={dayName[0]}
              key={index}
              isSelected={habitData.days.some((item) => item === week[dayName])}
              created={created}
            />
          ))}
        </DaysContainer>
      </HabitContainer>
    );
  }

  return (
    <HabitContainer>
      <form onSubmit={createHabit}>
        <fieldset disabled={disabled}>
          <Input
            placeholder="nome do hábito"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          />
          <DaysContainer>
            {Object.keys(week).map((dayName, index) => (
              <Day
                dayNumber={week[dayName]}
                dayName={dayName[0]}
                key={index}
                newHabit={newHabit}
                setNewHabit={setNewHabit}
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
