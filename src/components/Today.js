import { useContext } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/UserContext";
import BottomBar from "./BottomBar";
import { Checkbox } from "react-ionicons";
import {
  Main,
  HabitsContainer,
  Title,
  HabitContainer,
} from "./shared/stylesApp";
import TopBar from "./TopBar";

export default function Today() {
  let value = useContext(TokenContext);

  console.log(value);
  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>Segunda, 17/05</Title>
          <p>Nenhum habito concluido ainda</p>
        </TitleContainer>
        <HabitsContainer>
          <TodayHabitContainer>
            <div>
              <h1>Ler 1 Capitulo de Livro</h1>
              <p>Sequencia atual: 3 dias</p>
              <p>Seu Recorde: 5 dias</p>
            </div>
            <Checkbox color={"#E7E7E7"} height="100px" width="100px" />
          </TodayHabitContainer>
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

  button {
  }
`;
