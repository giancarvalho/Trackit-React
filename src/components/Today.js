import { useContext, useState } from "react";
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
import UpdateContext from "../contexts/UpdateContext";

function TodayHabit({ habit, user }) {
  const [checked, setChecked] = useState(habit.done);
  const { update, setUpdate } = useContext(UpdateContext);
  const [habitClone, setHabitClone] = useState({ ...habit });
  const { todayProgress, setTodayProgress } = useContext(ProgressContext);

  function checkHabit(id) {
    if (!habit.done) {
      setChecked(true);
      updateClone("+");
      checkHabitRequest(id, "check", user.token)
        .then(() => setUpdate(update + 1))
        .catch(() => {
          alert("Ocorreu um problema. Tente Novamente");
        });
      return;
    }

    updateClone("-");
    setChecked(false);
    checkHabitRequest(id, "uncheck", user.token)
      .then(() => setUpdate(update + 1))
      .catch(() => {
        alert("Ocorreu um problema. Tente Novamente");
      });
  }

  function updateClone(operation) {
    let newValue = habitClone.currentSequence;

    if (operation === "+") {
      setTodayProgress({
        ...todayProgress,
        tasksDone: todayProgress.tasksDone + 1,
      });
      newValue++;
    } else {
      setTodayProgress({
        ...todayProgress,
        tasksDone: todayProgress.tasksDone - 1,
      });
      newValue--;
    }

    if (habitClone.currentSequence === habitClone.highestSequence) {
      setHabitClone({
        ...habitClone,
        currentSequence: newValue,
        highestSequence: newValue,
        done: !habitClone.done,
      });
    } else {
      setHabitClone({
        ...habitClone,
        currentSequence: newValue,
        done: !habitClone.done,
      });
    }
  }

  return (
    <TodayHabitContainer>
      <div>
        <h1>{habitClone.name}</h1>
        <p>
          Sequencia atual:{" "}
          <span className={habitClone.done ? "done" : ""}>
            {habitClone.currentSequence} dias
          </span>
        </p>
        <p>
          Seu Recorde:{" "}
          <span
            className={
              habitClone.highestSequence === habitClone.currentSequence &&
              habitClone.highestSequence > 0
                ? "done"
                : ""
            }
          >
            {habitClone.highestSequence} dias
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

export default function Today({ todayList }) {
  let { user } = useContext(UserContext);
  const { todayProgress } = useContext(ProgressContext);
  const progress = (todayProgress.tasksDone / todayProgress.tasks) * 100;

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
          {progress === 0 ? (
            <p>Nenhum habito concluído ainda</p>
          ) : (
            <p className="done">{progress.toFixed()}% dos habitos concluídos</p>
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
