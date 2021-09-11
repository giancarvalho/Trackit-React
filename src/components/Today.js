import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import ProgressContext from "../contexts/ProgressContext";
import BottomBar from "./BottomBar";
import { Checkbox } from "react-ionicons";
import {
  Main,
  HabitsContainer,
  Title,
  HabitContainer,
} from "./shared/stylesApp";
import TopBar from "./TopBar";
import { checkHabitRequest, getTodayHabitList } from "../trackitRequests";

function TodayHabit({ habit, user, setUpdate, update }) {
  function checkHabit(id) {
    if (!habit.done) {
      checkHabitRequest(id, "check", user.token)
        .then(() => setUpdate(update + 1))
        .catch(console.log("Failed"));
      return;
    }

    checkHabitRequest(id, "uncheck", user.token)
      .then(() => setUpdate((update = update + 1)))
      .catch(console.log("Failed"));
  }

  return (
    <TodayHabitContainer>
      <div>
        <h1>{habit.name}</h1>
        <p>
          Sequencia atual:{" "}
          {habit.done ? (
            <span className="done">{habit.currentSequence} dias</span>
          ) : (
            <span>{habit.currentSequence} dias</span>
          )}{" "}
        </p>
        <p>Seu Recorde: {habit.highestSequence} dias</p>
      </div>
      <Checkbox
        color={habit.done ? "#8FC549" : "#E7E7E7"}
        height="100px"
        width="100px"
        onClick={() => checkHabit(habit.id)}
      />
    </TodayHabitContainer>
  );
}

export default function Today() {
  let { user } = useContext(UserContext);
  const [todayList, setTodayList] = useState([]);
  const [todayProgress, setTodayProgress] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getTodayHabitList(user.token).then((response) => {
      let list = response.data;
      list = list.sort().reverse();
      setTodayList(list);
      calculateProgress(list);
    });
  }, [update]);

  console.log(todayProgress);

  function getFormatedDate() {
    let now = new Date();
    let options = { weekday: "long", month: "numeric", day: "numeric" };
    let date = now.toLocaleString("pt-BR", options);

    return date.charAt(0).toUpperCase() + date.slice(1);
  }

  function calculateProgress(habitList) {
    let doneTask = habitList.filter((item) => item.done);
    let donePercentage = (doneTask.length / habitList.length) * 100;

    setTodayProgress(donePercentage.toFixed());
  }

  console.log(isNaN(todayProgress));

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
            <TodayHabit
              habit={habit}
              user={user}
              key={index}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
        </HabitsContainer>
      </Main>
      <BottomBar todayProgress={todayProgress} />
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
