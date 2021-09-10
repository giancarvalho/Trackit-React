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

const Anchor = styled.a`
  color: #52b6ff;
`;

export { LogoContainer, Anchor, LoginContainer, Main };
