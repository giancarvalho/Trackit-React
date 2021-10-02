import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function TopBar() {
    const { user } = useContext(UserContext);
    const [openMenu, setOpenMenu] = useState(false);
    const history = useHistory();

    function logOut() {
        localStorage.removeItem("storedUser");
        history.push("/");
    }

    return (
        <>
            <Top>
                <TrackIt size="40px" />
                <Button onClick={() => setOpenMenu(!openMenu)}>
                    <img src={user.image} alt="profile" />
                </Button>
            </Top>
            <MenuContainer openMenu={openMenu}>
                <Button onClick={logOut}>Logout</Button>
            </MenuContainer>
        </>
    );
}

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background-color: #126ba5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 10px;

    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`;

const TrackIt = styled.h1`
    font-family: "Playball", cursive;
    font-size: ${(props) => props.size};
    color: #fff;
    :before {
        content: "TrackIt";
    }
`;

const MenuContainer = styled.div`
    height: 35px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    position: fixed;
    top: ${({ openMenu }) => (openMenu ? "70px" : "-30vh")};
    right: 0;
    transition: top 350ms ease-in-out;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 10px 10px;
    color: #126ba5;
`;

const Button = styled.div`
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
`;
