import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "./useAuth";

// Function used to update a course by an authorized user
export default function UpdateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  let history = useHistory();
  let auth = useAuth();
  let { id } = useParams();

  // Handles the action for the cancel button... return to '/courses/${id}'
  const handleCancel = () => {
    history.push(`/courses/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setTitle(res.title);
            setDescription(res.description);
            setEstimatedTime(res.estimatedTime);
            setMaterialsNeeded(res.materialsNeeded);
            if (auth.user.id !== res.userId) {
              history.push("/forbidden");
            }
          });
        } else if (res.status === 404) {
          history.push("/notfound");
        } else if (res.status === 500) {
          history.push("/error");
        }
      })
      .catch((err) => history.push("/error"));
  }, [auth.user.id, id, history]);

  // Handles the form submittal
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form action
    console.log(auth);
    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth.credentials}`,
      },
    };

    fetch(`http://localhost:5000/api/courses/${id}`, options).then((res) => {
      if (res.status === 400) {
        // Handles any errors
        res.json().then((err) => setErrors(err.errors));
      } else if (res.status === 403) {
        history.push("/forbidden");
      } else if (res.status === 500) {
        history.push("/error");
      } else if (res.status === 204) {
        history.push(`/courses/${id}`);
      }
    });
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {errors.length > 0 ? (
        // handle any validation errors
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
              value={title || ""}
            ></input>

            <p>By {`${auth.user.firstName} ${auth.user.lastName}`}</p>

            <label>Course Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id="courseDescription"
              name="courseDescription"
              value={description || ""}
            ></textarea>
          </div>
          <div>
            <label>Estimated Time</label>
            <input
              onChange={(e) => setEstimatedTime(e.target.value)}
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime || ""}
            ></input>

            <label>Materials Needed</label>
            <textarea
              onChange={(e) => setMaterialsNeeded(e.target.value)}
              id="materialsNeeded"
              name="materialsNeeded"
              value={materialsNeeded || ""}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
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
}
