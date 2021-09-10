import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import BottomBar from "./BottomBar";
import { Checkbox } from "react-ionicons";
import {
  Main,
  HabitsContainer,
  Title,
  HabitContainer,
} from "./shared/stylesApp";
import TopBar from "./TopBar";
import { getTodayHabitList } from "../trackitRequests";

export default function Today() {
  let { user } = useContext(UserContext);
  const [todayList, setTodayList] = useState([]);

  useEffect(() => {
    getTodayHabitList(user.token).then((response) =>
      setTodayList(response.data)
    );
  }, []);

  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>Segunda, 17/05</Title>
          <p>Nenhum habito concluido ainda</p>
        </TitleContainer>
        <HabitsContainer>
          {todayList.map((habit) => {
            return (
              <TodayHabitContainer>
                <div>
                  <h1>{habit.name}</h1>
                  <p>Sequencia atual: {habit.currentSequence}</p>
                  <p>Seu Recorde: {habit.highestSequence}</p>
                </div>
                <Checkbox
                  color={habit.done ? "#8FC549" : "#E7E7E7"}
                  height="100px"
                  width="100px"
                />
              </TodayHabitContainer>
            );
          })}
        </HabitsContainer>
      </Main>
      <BottomBar />
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width: 100%;

  p {
    font-size: 18px;
    color: #bababa;
    margin-top: 8px;
  }
`;

const TodayHabitContainer = styled(HabitContainer)`
  display: flex;
  justify-content: space-between;
  padding: 13px;

  p {
    font-size: 13px;
    line-height: 17px;
  }
`;
