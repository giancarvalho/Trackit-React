import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { Button } from "./shared/style";

export default function MyHabits() {
  const percentage = 50;
  return (
    <>
      <Top>
        <TrackIt size="40px" />
      </Top>
      <Main>
        <TitleContainer>
          <Title>Meus hábitos</Title>
          <Button width="40px" height="35px">
            +
          </Button>
        </TitleContainer>
        <HabitsContainer>
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        </HabitsContainer>
      </Main>
      <BottomBar>
        <p>Hábitos</p>
        <ProgressBarContainer>
          <CircularProgressbar
            value={percentage}
            text="Hoje"
            strokeWidth={12}
            styles={buildStyles({
              textColor: "white",
              pathColor: "white",
              trailColor: "transparent",
            })}
          />
        </ProgressBarContainer>
        <p>Histórico</p>
      </BottomBar>
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

const Top = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;

const TrackIt = styled.h1`
  font-family: "Playball", cursive;
  font-size: ${(props) => props.size};
  color: #fff;
  :before {
    content: "TrackIt";
  }
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

  p {
    font-size: 18px;
    color: #666666;
    line-height: 23px;
  }
`;

const BottomBar = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    color: #52b6ff;
  }
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  width: 97px;
  height: 97px;
  background-color: #52b6ff;
  border-radius: 50%;
  padding: 7px;
  bottom: 10px;
`;
