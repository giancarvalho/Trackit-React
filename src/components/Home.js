import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { loginRequest } from "../trackitRequests";
import {
  Anchor,
  Button,
  Input,
  LoginContainer,
  LogoContainer,
  Main,
} from "./shared/style";
import { useHistory } from "react-router";

export default function Home({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function LogIn() {
    let body = {
      email,
      password,
    };

    loginRequest(body)
      .then((response) => {
        history.push("/hoje");
        setToken(response.data.token);
      })
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button width="100%" height="45px" onClick={LogIn}>
          Entrar
        </Button>
      </LoginContainer>
      <Link to="/cadastro">
        <Anchor href="#">Não tem uma conta? Cadastre-se!</Anchor>
      </Link>
    </Main>
  );
}
