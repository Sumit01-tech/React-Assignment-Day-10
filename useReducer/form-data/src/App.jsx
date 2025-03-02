import { useReducer, useState } from "react";

// Initial state
const initialState = {
  email: "",
  password: "",
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...state, email: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setSubmitted(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Form with useReducer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Enter password"
          value={state.password}
          onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })}
          required
        />
        <br /><br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {!submitted ? (
          <div>No details found</div>
        ) : (
          <div>
            <div><b>User Email:</b> {state.email}</div>
            <div><b>User Password:</b> {state.password}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
