import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
} from "./shared/style";
import logo from "../assets/logo.png";

export default function Register() {
  return (
    <>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <Input placeholder="email" />
        <Input placeholder="senha" />
        <Input placeholder="nome" />
        <Input placeholder="foto" />
        <Button>Cadastrar</Button>
      </LoginContainer>
      <Anchor href="#">Já tem uma conta? Faça Login!</Anchor>
    </>
  );
}
