import React, { useContext } from "react";

import { AuthContext } from "../context/auth";
import AuthenticatedHome from "../components/home-content/AuthenticatedHome";
import UnauthenticatedHome from "../components/home-content/UnauthenticatedHome";

export default function Home() {
  const { user } = useContext(AuthContext);

  const content = user ? <AuthenticatedHome user={user} /> : <UnauthenticatedHome />;
  return content;
}
