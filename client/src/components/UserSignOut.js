import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Signout() {
  const auth = useAuth();
  // run after component mounts
  useEffect(() => {
    auth.signout();
  });

  return <Redirect to="/" />;
}
