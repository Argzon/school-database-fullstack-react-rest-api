import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ProvideAuth } from "./components/useAuth";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";
import Error401 from "./components/Error401";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses" component={Courses} />
          <PrivateRoute path="/courses/create">
            <CreateCourse />
          </PrivateRoute>
          <PrivateRoute path="/courses/:id/update">
            <UpdateCourse />
          </PrivateRoute>
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error401" component={Error401} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
