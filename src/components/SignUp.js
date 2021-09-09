import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
  Main,
} from "./shared/style";
import logo from "../assets/logo.png";
import { useState } from "react";
import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";
import { registerRequest } from "../trackitRequests";
import { useHistory } from "react-router";

export default function SignUp({ setToken }) {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  function register() {
    registerRequest(form)
      .then(() => history.push("/"))
      .catch((error) => console.log(error.status));
  }

  return (
    <Main>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <Input
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Input
          placeholder="nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="foto"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <Button width="100%" height="45px" onClick={register}>
          Cadastrar
        </Button>
      </LoginContainer>
      <Anchor href="#">Já tem uma conta? Faça Login!</Anchor>
    </Main>
  );
}
