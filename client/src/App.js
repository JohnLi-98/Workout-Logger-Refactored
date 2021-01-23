import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";

import { AuthProvider } from "./context/auth";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container maxWidth="lg">
          <Route exact path="/" component={Home} />
          <Route exact path="/account/login" component={Login} />
          <Route exact path="/account/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
