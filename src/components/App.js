import "../reset.css";
import "../global.css";
import styled from "styled-components";
import Home from "./Home";
import logo from "../assets/logo.png";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Main>
        <Home />
        {/* <Register /> */}
      </Main>
    </div>
  );
}

export default App;

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
