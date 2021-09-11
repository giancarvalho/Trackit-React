import { useContext, useState } from "react";
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
import UserContext from "../contexts/UserContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  function storeUser(userData) {
    localStorage.setItem("storedUser", JSON.stringify(userData));
  }

  if (!!user.token) {
    console.log("im here");
    history.push("/hoje");
  }

  function LogIn() {
    let body = {
      email,
      password,
    };

    loginRequest(body).then((response) => {
      setUser(response.data);
      storeUser(response.data);
      history.push("/hoje");
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
