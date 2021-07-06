import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

function Header() {
  //Consumer of auth context to keep state
  const auth = useAuth();

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {auth.user ? (
            <>
              <ul className="header--signedout">
                <span className="span">
                  Welcome {`${auth.user.firstName} ${auth.user.lastName} `}
                </span>
                <Link to="/signout">Sign Out</Link>
              </ul>
            </>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
