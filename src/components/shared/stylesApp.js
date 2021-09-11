import styled from "styled-components";
import Loader from "react-loader-spinner";

function SubmitButton({ children, disabled, height, width }) {
  return (
    <Button height={height} width={width} disabled={disabled}>
      {disabled ? (
        <Loader type="ThreeDots" color="#fff" height={35} width={35} />
      ) : (
        children
      )}
    </Button>
  );
}

const Main = styled.main`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  margin: 70px 0;
  padding: 20px 15px;
`;

const HabitContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 15px;
  color: #666666;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: 20px;
    margin: 10px 0;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  .cancelar {
    background-color: #fff;
    color: #52b6ff;
    margin-right: 25px;
  }
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  border: 1px solid #d4d4d4;
  font-size: 20px;
  padding: 0 8px;
  margin: 5px 0;
  border-radius: 5px;

  ::placeholder {
    color: #dbdbdb;
  }

  :focus {
    border: 1px solid #52b6ff;
    outline: none !important;
  }
`;

const Button = styled.button`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => (props.disabled ? "#86CCFF" : "#52b6ff")};
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin: 5px 0;
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

export {
  HabitContainer,
  Input,
  SubmitButton,
  Main,
  Title,
  HabitsContainer,
  Button,
};
