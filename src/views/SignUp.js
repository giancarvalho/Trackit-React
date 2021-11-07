import {
    Anchor,
    LoginContainer,
    LogoContainer,
    Main,
} from "../components/shared/stylesFrontPages";
import { SubmitButton, Input } from "../components/shared/stylesApp";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { registerRequest } from "../services/trackitRequests";

export default function SignUp() {
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: "",
    });

    function register(e) {
        e.preventDefault();
        setDisabled(true);
        registerRequest(form)
            .then(() => history.push("/"))
            .catch((error) => {
                alert(
                    "Ops, we can't reach our server at the moment. Check your connection and reload the page."
                );
                setDisabled(false);
            });
    }

    return (
        <Main>
            <LogoContainer>
                <img src={logo} alt="logo-TrackIt" />
            </LogoContainer>
            <LoginContainer>
                <form onSubmit={register}>
                    <fieldset disabled={disabled}>
                        <Input
                            placeholder="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                        />
                        <Input
                            placeholder="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                        />
                        <Input
                            type="url"
                            placeholder="profile pic url"
                            value={form.image}
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.value })
                            }
                            required
                        />
                        <SubmitButton
                            type="submit"
                            width="100%"
                            height="45px"
                            disabled={disabled}
                        >
                            Sign Up
                        </SubmitButton>
                    </fieldset>
                </form>
            </LoginContainer>
            <Link to="/">
                <Anchor href="#">Already have an account? Sign in!</Anchor>
            </Link>
        </Main>
    );
}
