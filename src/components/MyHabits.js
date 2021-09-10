import { useState } from "react";
import styled from "styled-components";
import BottomBar from "./BottomBar";
import {
  Button,
  Input,
  HabitContainer,
  HabitsContainer,
  Title,
  Main,
} from "./shared/stylesApp";
import TopBar from "./TopBar";

function Day({ index, newHabit, setNewHabit }) {
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

  return (
    <DayContainer onClick={() => addDay(index + 1)} selected={selected}>
      {" "}
      {week[index]}{" "}
    </DayContainer>
  );
}

function Habit({ setInsertHabit }) {
  const [newHabit, setNewHabit] = useState({ name: "", days: [] });

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
        <Button width="84px" height="35px">
          Salvar
        </Button>
      </div>
    </HabitContainer>
  );
}

export default function MyHabits() {
  const [insertHabit, setInsertHabit] = useState(null);

  function addHabit() {
    if (!insertHabit) {
      setInsertHabit(<Habit setInsertHabit={setInsertHabit} />);
    } else {
      setInsertHabit(null);
    }
  }

  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>Meus hábitos</Title>
          <Button width="40px" height="35px" onClick={() => addHabit()}>
            +
          </Button>
        </TitleContainer>

        <HabitsContainer>
          {insertHabit}
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        </HabitsContainer>
      </Main>
      <BottomBar />
    </>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

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
