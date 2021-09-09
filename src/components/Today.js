import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

export default function Today() {
  let value = useContext(TokenContext);

  console.log(value);
  return (
    <>
      <TopBar />
      <BottomBar />
    </>
  );
}
