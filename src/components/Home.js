import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { loginRequest } from "../trackitRequests";
import {
  Anchor,
  LoginContainer,
  LogoContainer,
  Main,
} from "./shared/stylesFrontPages";
import { Button, Input } from "./shared/stylesApp";
import { useHistory } from "react-router";

export default function Home({ setUser }) {
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
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response);
      });
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
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button width="100%" height="45px" onClick={LogIn}>
          Entrar
        </Button>
      </LoginContainer>
      <Link to="/cadastro">
        <Anchor>Não tem uma conta? Cadastre-se!</Anchor>
      </Link>
    </Main>
  );
}
