import BottomBar from "./BottomBar";
import { HabitsContainer, Main, Title } from "./shared/stylesApp";
import TopBar from "./TopBar";
import styled from "styled-components";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

export default function History() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  if (!user) {
    history.push("/");
    return "Redirecionando...";
  }

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
