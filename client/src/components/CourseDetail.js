import { useEffect, useState } from "react";
import axios from "axios";

const CourseDetail = (props) => {
  // create state
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const [description, setDescription] = useState([]);

  // get api data for course
  const getCourse = (id) => {
    axios.get(`http://localhost:5000/course/${id}`).then((response) => {
      setCourse(response.data);
      setUser(response.data.User);

      let description = response.data.description.filter((desc) => desc !== "");
      setDescription(description);
    });
  };

  // gets data on page render
  useEffect(() => {
    // get id from the url parameter
    const id = props.match.params.id;

    //get course data based on id
    getCourse(id);
  }, []);

  return (
    <div class="wrap">
      <h2>Course Detail</h2>
      <form>
        <div class="main--flex">
          <div>
            <h3 class="course--detail--title">Course</h3>
            <h4 class="course--name">{course.title}</h4>
            <p>
              By {user.firstName} {user.lastName}
            </p>
            <p>{description.map((desc) => desc)}</p>
          </div>
          <div>
            <h3 class="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>

            <h3 class="course--detail--title">Materials Needed</h3>
            <ul class="course--detail--list">
              <li>1/2 x 3/4 inch parting strip</li>
              <li>1 x 2 common pine</li>
              <li>1 x 4 common pine</li>
              <li>1 x 10 common pine</li>
              <li>1/4 inch thick lauan plywood</li>
              <li>Finishing Nails</li>
              <li>Sandpaper</li>
              <li>Wood Glue</li>
              <li>Wood Filler</li>
              <li>Minwax Oil Based Polyurethane</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseDetail;
