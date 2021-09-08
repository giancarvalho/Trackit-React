import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 20% 0 10%;
`;

const TrackIt = styled.h1`
  font-family: "Playball", cursive;
  font-size: ${(props) => props.size};
  color: #126ba5;
  :before {
    content: "TrackIt";
  }
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
`;

const Button = styled.button`
  height: 45px;
  width: 100%;
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

export { LogoContainer, Anchor, Button, Input, LoginContainer, TrackIt };
