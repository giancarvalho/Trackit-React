import "../reset.css";
import "../global.css";
import styled from "styled-components";
import Home from "./Home";
function App() {
  return (
    <div className="App">
      <Main>
        <Home />
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
