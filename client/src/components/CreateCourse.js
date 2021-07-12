import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./useAuth";

// Function to Create a new course ** Needs Auth **
const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  let history = useHistory();
  let auth = useAuth();
  // Helper function to handle the cancel button... redirect to '/'
  const handleCancel = () => {
    history.push("/");
  };

  // Helper function to handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default action of form
    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: auth.user.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth.credentials}`,
      },
      body: JSON.stringify(body),
    };
    fetch(`http://localhost:5000/api/courses`, options)
      .then((res) => {
        if (res.status === 201) {
          history.push("/");
        } else if (res.status === 400) {
          res.json().then((err) => setErrors(err.errors));
        } else if (res.status === 500) {
          history.push("/error");
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        history.push("/error");
      });
  };
  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors.length !== 0 ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label>Course Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
            ></input>

            <p>By {`${auth.user.firstName} ${auth.user.lastName}`}</p>

            <label>Course Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="courseDescription"
              name="courseDescription"
            ></textarea>
          </div>
          <div>
            <label>Estimated Time</label>
            <input
              onChange={(e) => setEstimatedTime(e.target.value)}
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
            ></input>

            <label>Materials Needed</label>
            <textarea
              onChange={(e) => setMaterialsNeeded(e.target.value)}
              id="materialsNeeded"
              name="materialsNeeded"
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
