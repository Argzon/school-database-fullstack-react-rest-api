import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function SignIn() {
  let auth = useAuth([]);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [errors, setErrors] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the form submital
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form action
    auth // Authorize user
      .signin(userEmail, password, () => history.replace(from))
      .then((errors) => {
        // Handle any errors
        if (errors !== null) {
          setErrors([errors]); // assign array of errors to state
        }
      })
      .catch((err) => {
        history.push("/error");
      });
  };
  // Helper function to handle the cancel button
  const handleCancel = (e) => {
    history.push("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      {errors.length > 0 ? (
        <div className="validation--errors">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={userEmail}
        ></input>
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
          value={password}
        ></input>
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up!</Link>
      </p>
    </div>
  );
}

export default SignIn;
