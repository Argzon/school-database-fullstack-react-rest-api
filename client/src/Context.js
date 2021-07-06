/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

//instantiat Context to all state to be passed to other components
const Context = React.createContext();

export class Provider extends Component {
  state = {
    // Authenticate user with Cookies
    // If no Cookies to set State return null
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  // ACTION => Sign In 'user' and assign Cookie
  // PARAMS => 'username' , 'password'
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        user.emailAddress = emailAddress;
        user.password = password;
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  // ACTION => Sign Out 'user' and remove Cookie
  // PARAMS => None
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove(`authenticatedUser`);
  };
}

export const Consumer = Context.Consumer;

// Higher order component to wrap the provided access to context
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
