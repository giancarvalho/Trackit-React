import logo from "../assets/logo.png";
import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
} from "./shared/style";

export default function Home() {
  return (
    <>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <Input placeholder="email" />
        <Input placeholder="senha" />
        <Button>Entrar</Button>
      </LoginContainer>
      <Anchor href="#">Não tem uma conta? Cadastre-se!</Anchor>
    </>
  );
}
