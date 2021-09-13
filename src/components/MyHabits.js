import { useContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import UpdateContext from "../contexts/UpdateContext";
import UserContext from "../contexts/UserContext";
import { getHabitList } from "../trackitRequests";
import BottomBar from "./BottomBar";
import { Habit, HabitForm } from "./Habit";
import { Button, HabitsContainer, Title, Main } from "./shared/stylesApp";
import TopBar from "./TopBar";

export default function MyHabits() {
  const [insertHabit, setInsertHabit] = useState(false);
  const [habitList, setHabitList] = useState(null);
  const [newHabit, setNewHabit] = useState({ name: "", days: [] });

  const { update } = useContext(UpdateContext);

  const { user } = useContext(UserContext);

  function addHabit() {
    if (!insertHabit) {
      setInsertHabit(true);
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
  }, [update]);

  function ListOrMessage() {
    return habitList.length > 0 ? (
      habitList.map((habit, index) => <Habit habitData={habit} key={index} />)
    ) : (
      <p>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </p>
    );
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
          {insertHabit && (
            <HabitForm
              setInsertHabit={setInsertHabit}
              newHabit={newHabit}
              setNewHabit={setNewHabit}
            />
          )}

          {habitList ? (
            <ListOrMessage />
          ) : (
            <LoaderContainer>
              <Loader type="ThreeDots" color="#52B6FF" height={75} width={75} />
            </LoaderContainer>
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

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
