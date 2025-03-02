import { useReducer, useState } from "react";

// Initial State
const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: { latitude: "", longitude: "" },
  },
  courses_offered: [],
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.payload };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.payload,
        },
      };

    case "UPDATE_CITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.field]: action.payload,
          },
        },
      };

    case "UPDATE_LOCALITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.payload,
            },
          },
        },
      };

    case "UPDATE_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.field]: action.payload,
          },
        },
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.payload],
      };

    case "REMOVE_COURSE":
      return {
        ...state,
        courses_offered: state.courses_offered.filter(
          (_, index) => index !== action.index
        ),
      };

    case "RESET":
      return initialState;

    default:
      throw new Error("Invalid action type");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [course, setCourse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.establishment_year || state.courses_offered.length === 0) {
      setError("Please fill all required fields and add at least one course.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setSubmitted(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>College Form with useReducer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "UPDATE_FIELD", field: "name", payload: e.target.value })
          }
          required
        />
        <br /><br />
        <input
          type="number"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({ type: "UPDATE_FIELD", field: "establishment_year", payload: e.target.value })
          }
          required
        />
        <br /><br />

        <h3>Address</h3>
        <input
          type="text"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({ type: "UPDATE_ADDRESS", field: "building", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({ type: "UPDATE_ADDRESS", field: "street", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="City"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({ type: "UPDATE_CITY", field: "name", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({ type: "UPDATE_LOCALITY", field: "pinCode", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({ type: "UPDATE_LOCALITY", field: "landmark", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({ type: "UPDATE_ADDRESS", field: "state", payload: e.target.value })
          }
        />
        <br /><br />

        <h3>Coordinates</h3>
        <input
          type="text"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({ type: "UPDATE_COORDINATES", field: "latitude", payload: e.target.value })
          }
        />
        <br /><br />
        <input
          type="text"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({ type: "UPDATE_COORDINATES", field: "longitude", payload: e.target.value })
          }
        />
        <br /><br />

        <h3>Courses Offered</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "ADD_COURSE", payload: course });
            setCourse("");
          }}
        >
          Add Course
        </button>
        <br /><br />
        <ul>
          {state.courses_offered.map((c, index) => (
            <li key={index}>
              {c}{" "}
              <button onClick={() => dispatch({ type: "REMOVE_COURSE", index })}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {submitted && (
          <pre style={{ textAlign: "left", backgroundColor: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default App;
