// Import Modules
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "./useAuth";

//Function to get course details for selected course
const CourseDetail = (props) => {
  // Set State using object
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  // Initiate variables
  let { id } = useParams();
  let auth = useAuth();
  let history = useHistory();
  // console.log(auth.user);

  // Fetch Course Detail by 'id' using params
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        //Check status for any error
        if (res.status === 200) {
          // Convert response to JSON and set new state
          res.json().then((res) => {
            setCourse(res);
            setUser(res.User);
          });
        } else if (res.status === 404) {
          history.push("/notfound");
        } else if (res.status === 500) {
          history.push("/error");
        }
      })
      .catch((err) => history.push("/error"));
  }, [id, history]);

  // Function to handle deleting a course
  const handleDelete = () => {
    // Fetch the course with matching id and delete it
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Basic ${auth.credentials}` },
    }).then((res) => {
      //error handling
      if (res.status === 204) {
        history.push("/");
      } else if (res.status === 403) {
        history.push("/forbidden");
      } else if (res.status === 404) {
        history.push("/notfound");
      } else if (res.status === 401) {
        history.push("/error401");
      } else {
        history.push("/error");
      }
    });
  };

  return (
    <main>
      <div className="actions--bar indent">
        {auth.user && user.id === auth.user.id ? (
          <div className="wrap">
            <Link to={`/courses/${course.id}/update`} className="button">
              Update Course
            </Link>
            <Link to="#" onClick={handleDelete} className="button">
              Delete Course
            </Link>
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
          </div>
        ) : (
          <div className="wrap">
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
          </div>
        )}
      </div>

      <div className="wrap">
        <h2 className="indent">Course Detail</h2>
        <form>
          <div className="main--flex">
            <div className="shadow">
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`by ${user.firstName} ${user.lastName}`}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div className="shadow">
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
