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
import { SubmitButton, Input } from "./shared/stylesApp";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  function storeUser(userData) {
    localStorage.setItem("storedUser", JSON.stringify(userData));
  }

  if (user) {
    history.push("/hoje");
  }

  function LogIn(e) {
    e.preventDefault();
    setDisabled(true);
    let body = {
      email,
      password,
    };

    loginRequest(body)
      .then((response) => {
        setUser(response.data);
        storeUser(response.data);
        history.push("/hoje");
      })
      .catch((error) => {
        alert("Confira novamente suas credenciais");
        setDisabled(false);
      });
  }

  return (
    <Main>
      <LogoContainer>
        <img src={logo} alt="logo-TrackIt" />
      </LogoContainer>
      <LoginContainer>
        <form onSubmit={LogIn}>
          <fieldset disabled={disabled}>
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
            <SubmitButton
              type="submit"
              width="100%"
              height="45px"
              disabled={disabled}
            >
              Entrar
            </SubmitButton>
          </fieldset>
        </form>
      </LoginContainer>
      <Link to="/cadastro">
        <Anchor>Não tem uma conta? Cadastre-se!</Anchor>
      </Link>
    </Main>
  );
}
