import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getHabitList } from "../trackitRequests";
import BottomBar from "./BottomBar";
import Habit from "./Habit";
import { Button, HabitsContainer, Title, Main } from "./shared/stylesApp";
import TopBar from "./TopBar";

export default function MyHabits() {
  const [insertHabit, setInsertHabit] = useState(null);
  const [habitList, setHabitList] = useState([]);

  const { user } = useContext(UserContext);

  function addHabit() {
    if (!insertHabit) {
      setInsertHabit(<Habit setInsertHabit={setInsertHabit} />);
    } else {
      setInsertHabit(null);
    }
  }

  useEffect(() => {
    getHabitList(user.token).then((response) => {
      let list = response.data;
      list = list.sort().reverse();

      setHabitList(list);
    });
  }, [insertHabit]);

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
          {habitList.length > 0 ? (
            habitList.map((habit, index) => (
              <Habit created={true} habitData={habit} key={index} />
            ))
          ) : (
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          )}
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
