import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

export default function PrivateRoute({ element: Element, path, ...rest }) {
    const { user } = useContext(UserContext);

    return (
        <Route exact path={path}>
            {user.token ? (
                <>
                    <TopBar />
                    <Element {...rest} />
                    <BottomBar />
                </>
            ) : (
                <Redirect to="/" />
            )}
        </Route>
    );
}
