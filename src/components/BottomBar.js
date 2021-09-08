import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function BottomBar() {
  const percentage = 50;
  return (
    <BottomBarContainer>
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
    </BottomBarContainer>
  );
}

const BottomBarContainer = styled.div`
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
