import BottomBar from "./BottomBar";
import { HabitsContainer, Main, Title } from "./shared/stylesApp";
import TopBar from "./TopBar";
import styled from "styled-components";
export default function History() {
  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>Historico</Title>
        </TitleContainer>
        <HabitsContainer>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </HabitsContainer>
      </Main>
      <BottomBar />
    </>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  margin: 10px 0 20px;
`;
