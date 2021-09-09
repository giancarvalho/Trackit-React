import styled from "styled-components";

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 20% 0 10%;
`;

const LoginContainer = styled.div`
  width: 80%;
  margin-bottom: 25px;
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
  background-color: #52b6ff;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin: 5px 0;
`;

const Anchor = styled.a`
  color: #52b6ff;
`;

const HabitContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 15px;

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

export {
  LogoContainer,
  Anchor,
  Button,
  Input,
  LoginContainer,
  Main,
  HabitContainer,
};
