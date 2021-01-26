import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";

import { AuthProvider } from "./context/auth";
import Navbar from "./components/navbar/Navbar";
import AuthRoute from "./util/AuthRoute";
import AuthUser from "./util/AuthUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container maxWidth="lg" style={{paddingTop: "30px"}}>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/account/login" component={Login} />
          <AuthRoute exact path="/account/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
