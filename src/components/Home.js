import logo from "../assets/logo.png";
import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
  Main,
} from "./shared/style";

export default function Home() {
  return (
    <Main>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <Input placeholder="email" />
        <Input placeholder="senha" />
        <Button width="100%" height="45px">
          Entrar
        </Button>
      </LoginContainer>
      <Anchor href="#">Não tem uma conta? Cadastre-se!</Anchor>
    </Main>
  );
}
