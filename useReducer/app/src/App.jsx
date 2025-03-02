import React, { useReducer, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Initial State for Reducers
const initialState = {
  isAuthenticated: false,
  user: null,
  theme: "light",
  searchResults: [],
  page: 1,
  paginationMode: true, // true = pagination, false = infinite scroll
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "TOGGLE_PAGINATION_MODE":
      return { ...state, paginationMode: !state.paginationMode };
    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce for API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch Countries API
  useEffect(() => {
    if (debouncedQuery) {
      fetch(`https://api.first.org/data/v1/countries?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "SET_SEARCH_RESULTS", payload: Object.values(data.data || {}) });
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [debouncedQuery]);

  return (
    <Router>
      <div className={state.theme}>
        {/* Navbar */}
        <nav>
          <Link to="/">Home</Link>
          {state.isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
            {state.theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={state.isAuthenticated ? <Dashboard state={state} dispatch={dispatch} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login dispatch={dispatch} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page
const Home = () => <h2>Welcome to React App</h2>;

// Login Page
const Login = ({ dispatch }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => dispatch({ type: "LOGIN", payload: "User123" })}>Login</button>
    </div>
  );
};

// Dashboard Page
const Dashboard = ({ state, dispatch }) => {
  return (
    <div>
      <h2>Dashboard - Welcome {state.user}</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search countries..."
        value={state.query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Pagination / Infinite Scroll Toggle */}
      <button onClick={() => dispatch({ type: "TOGGLE_PAGINATION_MODE" })}>
        {state.paginationMode ? "Switch to Infinite Scroll" : "Switch to Pagination"}
      </button>

      {/* Display Search Results */}
      <div>
        {state.searchResults.length > 0 ? (
          state.searchResults.map((country, index) => <p key={index}>{country.country}</p>)
        ) : (
          <p>No results found</p>
        )}
      </div>

      {/* Pagination Controls */}
      {state.paginationMode && (
        <div>
          <button onClick={() => dispatch({ type: "SET_PAGE", payload: state.page - 1 })} disabled={state.page === 1}>
            Previous
          </button>
          <span> Page {state.page} </span>
          <button onClick={() => dispatch({ type: "SET_PAGE", payload: state.page + 1 })}>Next</button>
        </div>
      )}
    </div>
  );
};

export default App;
