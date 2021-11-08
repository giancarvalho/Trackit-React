import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
    Anchor,
    LoginContainer,
    LogoContainer,
    Main,
} from "../components/shared/stylesFrontPages";
import { SubmitButton, Input } from "../components/shared/stylesApp";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import { loginRequest } from "../services/trackitRequests";

export default function Home() {
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const storedUser = getStoredUser();

        if (storedUser) {
            setUser(storedUser);
            history.push("/today");
        }
    });

    function getStoredUser() {
        let storedUser = localStorage.getItem("storedUser");
        storedUser = JSON.parse(storedUser);

        return storedUser;
    }

    function storeUser(userData) {
        localStorage.setItem("storedUser", JSON.stringify(userData));
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
                history.push("/today");
            })
            .catch((error) => {
                if (error.response.status === 404)
                    alert("User is not registered.");
                else alert("Password incorrect");

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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <SubmitButton
                            type="submit"
                            width="100%"
                            height="45px"
                            disabled={disabled}
                        >
                            Sign In
                        </SubmitButton>
                    </fieldset>
                </form>
            </LoginContainer>
            <Link to="/signup">
                <Anchor>First time? Sign up!</Anchor>
            </Link>
        </Main>
    );
}
