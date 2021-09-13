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
import { checkHabitRequest } from "../trackitRequests";
import ProgressContext from "../contexts/ProgressContext";

function TodayHabit({ habit, user }) {
  const [checked, setChecked] = useState(habit.done);
  const { todayProgress, setTodayProgress } = useContext(ProgressContext);

  function checkHabit(id) {
    if (!habit.done) {
      setChecked(true);
      checkHabitRequest(id, "check", user.token)
        .then(() =>
          setTodayProgress({
            ...todayProgress.progress,
            update: todayProgress.update + 1,
          })
        )
        .catch(() => alert("Ocorreu um problema. Tente Novamente"));
      return;
    }

    setChecked(false);
    checkHabitRequest(id, "uncheck", user.token)
      .then(() =>
        setTodayProgress({
          ...todayProgress.progress,
          update: todayProgress.update + 1,
        })
      )
      .catch(() => alert("Ocorreu um problema. Tente Novamente"));
  }

  return (
    <TodayHabitContainer>
      <div>
        <h1>{habit.name}</h1>
        <p>
          Sequencia atual:{" "}
          <span className={habit.done && "done"}>
            {habit.currentSequence} dias
          </span>
        </p>
        <p>
          Seu Recorde:{" "}
          <span
            className={
              habit.highestSequence === habit.currentSequence &&
              habit.highestSequence > 0 &&
              "done"
            }
          >
            {habit.highestSequence} dias
          </span>{" "}
        </p>
      </div>
      <Checkbox
        color={checked ? "#8FC549" : "#E7E7E7"}
        height="100px"
        width="100px"
        onClick={() => checkHabit(habit.id)}
      />
    </TodayHabitContainer>
  );
}

export default function Today({ todayList, setTodayList }) {
  let { user } = useContext(UserContext);
  const { todayProgress, setTodayProgress } = useContext(ProgressContext);

  function getFormatedDate() {
    let now = new Date();
    let options = { weekday: "long", month: "numeric", day: "numeric" };
    let date = now.toLocaleString("pt-BR", options);

    return date.charAt(0).toUpperCase() + date.slice(1);
  }

  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>{getFormatedDate()}</Title>
          {todayProgress === "0" || isNaN(todayProgress) ? (
            <p>Nenhum habito concluído ainda</p>
          ) : (
            <p className="done">{todayProgress}% dos habitos concluídos</p>
          )}
        </TitleContainer>
        <HabitsContainer>
          {todayList.map((habit, index) => (
            <TodayHabit habit={habit} user={user} key={index} />
          ))}
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

  .done {
    color: #8fc549;
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

  .done {
    color: #8fc549;
  }
`;
