import { useReducer } from "react";
import styled from "@emotion/styled";

// Define initial state
const initialState = { theme: "light" };

// Define actions
const TOGGLE_THEME = "TOGGLE_THEME";

// Reducer function
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return { theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

// Styled components for themes
const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.theme === "light" ? "#fff" : "#333")};
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  color: ${(props) => (props.theme === "light" ? "#fff" : "#000")};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.theme === "light" ? "#555" : "#ddd")};
  }
`;

const App = () => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <AppContainer theme={state.theme}>
      <h1>Current Theme: {state.theme}</h1>
      <Button theme={state.theme} onClick={() => dispatch({ type: TOGGLE_THEME })}>
        Toggle Theme
      </Button>
    </AppContainer>
  );
};

export default App;
