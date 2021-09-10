import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { createHabitRequest } from "../trackitRequests";
import { Button, HabitContainer, Input } from "./shared/stylesApp";

function Day({ index, newHabit, setNewHabit, isSelected, created }) {
  const [selected, setSelected] = useState(false);
  const week = ["S", "T", "Q", "Q", "S", "S", "D"];

  function addDay(day) {
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
    return <DayContainer selected={isSelected}> {week[index]} </DayContainer>;
  }
  return (
    <DayContainer onClick={() => addDay(index + 1)} selected={selected}>
      {" "}
      {week[index]}{" "}
    </DayContainer>
  );
}

export default function Habit({ setInsertHabit, habitData, created }) {
  const [newHabit, setNewHabit] = useState({ name: "", days: [] });
  const { user } = useContext(UserContext);

  function createHabit() {
    if (newHabit.name.length > 0 && newHabit.days.length > 0) {
      createHabitRequest(newHabit, user.token)
        .then((response) => setInsertHabit(null))
        .catch((error) => console.log(error));
    } else {
      alert("escreva o nome do habito e selecione o dia para continuar");
    }
  }

  if (created) {
    return (
      <HabitContainer>
        <h1>{habitData.name} </h1>
        <DaysContainer>
          {Array.from({ length: 7 }, (v, index) => (
            <Day
              index={index}
              key={index}
              created={created}
              isSelected={habitData.days.some((item) => item === index + 1)}
            />
          ))}
        </DaysContainer>
      </HabitContainer>
    );
  }

  return (
    <HabitContainer>
      <Input
        placeholder="nome do hábito"
        value={newHabit.name}
        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
      />
      <DaysContainer>
        {Array.from({ length: 7 }, (v, index) => (
          <Day
            index={index}
            key={index}
            setNewHabit={setNewHabit}
            newHabit={newHabit}
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
        <Button width="84px" height="35px" onClick={createHabit}>
          Salvar
        </Button>
      </div>
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