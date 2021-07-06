import config from "./config";

export default class Data {
  // Handle the API request and responses
  // Requires a Path with optional 'method', 'id', 'body', 'requiresAuth,
  // and 'Credentials' parameters depending on API requests and responses.
  api(
    path,
    method = "GET",
    id = null,
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    let url;
    // Dynamically create full path and params
    if (id > 0) {
      // Check to see if there's an id param
      // If 'id' exists and it to path to render detail page
      url = `${config.apiBaseUrl}${path}/${id}`;
    } else {
      url = config.apiBaseUrl + path;
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    // Check if body is null. If not null Stringify content
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if authentication is required. If required get use credentials and options
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // GET => ALL Courses;
  // AUTH => No
  // PARAMS => None

  async getCourses() {
    const res = await this.api("/courses");
    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET => ONE Course
  // AUTH => No
  // PARAMS => 'id'
  async getCourse(id) {
    const res = await this.api("/courses", "GET", id);
    if (res.status === 200) {
      // Convert data to JSON and return
      return res.json().then((data) => data);
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET - ONE User
  // AUTH - Yes
  // PARAMS - 'username' , 'password'
  async getUser(username, password) {
    const res = await this.api(`/users`, `GET`, null, null, true, {
      username,
      password,
    });
    // Check status
    if (res.status === 200) {
      // Convert data into JSON and return
      return res.json().then((data) => data);
    } else if (res.status === 401) {
      return res.json().then((data) => {
        data.message =
          "Not Authorized. Please provide a valid email and password.";
        return data.message;
      });
    } else {
      throw new Error();
    }
  }

  // POST => NEW User
  // AUTH => No
  // PARAMS => 'user' object with user data
  async createUser(user) {
    const res = await this.api("/users", "POST", user);
    // Check status
    if (res.status === 201) {
      return ["User successfully created"];
    } else if (res.status === 400) {
      // Convert respons into JSON and return
      return res.jason().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
