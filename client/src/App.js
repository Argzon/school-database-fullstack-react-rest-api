import { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

// import components
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
