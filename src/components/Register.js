import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
  Main,
} from "./shared/style";
import logo from "../assets/logo.png";

export default function Register() {
  return (
    <Main>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <Input placeholder="email" />
        <Input placeholder="senha" />
        <Input placeholder="nome" />
        <Input placeholder="foto" />
        <Button width="100%" height="45px">
          Cadastrar
        </Button>
      </LoginContainer>
      <Anchor href="#">Já tem uma conta? Faça Login!</Anchor>
    </Main>
  );
}
