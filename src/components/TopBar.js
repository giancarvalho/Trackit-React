import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function TopBar() {
  const { user } = useContext(UserContext);

  return (
    <Top>
      <TrackIt size="40px" />
      <img src={user.image} alt="profile" />
    </Top>
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
