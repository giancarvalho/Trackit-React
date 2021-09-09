import styled from "styled-components";
import BottomBar from "./BottomBar";
import { Button, Input, HabitContainer } from "./shared/style";
import TopBar from "./TopBar";

export default function MyHabits() {
  return (
    <>
      <TopBar />
      <Main>
        <TitleContainer>
          <Title>Meus hábitos</Title>
          <Button width="40px" height="35px">
            +
          </Button>
        </TitleContainer>
        <HabitsContainer>
          <HabitContainer>
            <Input placeholder="nome do hábito" />
            <WeekDays>
              <button>D</button>
              <button>S</button>
              <button>T</button>
              <button>Q</button>
              <button>Q</button>
              <button>S</button>
              <button>S</button>
            </WeekDays>
            <div className="buttons">
              <Button width="84px" height="35px" className="cancelar">
                Cancelar
              </Button>
              <Button width="84px" height="35px">
                Salvar
              </Button>
            </div>
          </HabitContainer>
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

const Main = styled.main`
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  margin-top: 70px;
  padding: 20px 15px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 23px;
  color: #126ba5;
`;

const HabitsContainer = styled.div`
  width: 100%;

  > p {
    font-size: 18px;
    color: #666666;
    line-height: 23px;
  }
`;

const WeekDays = styled.div`
  width: 100%;
  margin: 7px 0;

  button {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    background-color: transparent;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    color: #d4d4d4;
    font-size: 18px;
  }
`;
