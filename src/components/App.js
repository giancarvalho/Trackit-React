import "../reset.css";
import "../global.css";
import styled from "styled-components";
import Home from "./Home";
import logo from "../assets/logo.png";
import Register from "./Register";
import { Button } from "./shared/style";
import MyHabits from "./MyHabits";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Register /> */}
      <MyHabits />
    </div>
  );
}

export default App;
