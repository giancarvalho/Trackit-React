import styled from "styled-components";

export default function TopBar() {
  return (
    <Top>
      <TrackIt size="40px" />
    </Top>
  );
}

const Top = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;

const TrackIt = styled.h1`
  font-family: "Playball", cursive;
  font-size: ${(props) => props.size};
  color: #fff;
  :before {
    content: "TrackIt";
  }
`;
