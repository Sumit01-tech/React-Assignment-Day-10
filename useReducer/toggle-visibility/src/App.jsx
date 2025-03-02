import { useReducer } from "react";

// Initial state
const initialState = { isVisible: false };

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
};

const App = () => {
  // useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}>
        Toggle Message
      </button>
      {state.isVisible && <h2>Hello, World!</h2>}
    </div>
  );
};

export default App;
