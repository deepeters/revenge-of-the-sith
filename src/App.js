import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

function App() {
  const marginTop = {
    marginTop: "20px",
  };

  return (
    <Router>
      <NavigationBar />
      <Container style={marginTop}>
        <Row>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/add" exact component={Product} />
            <Route path="/edit/:id" exact component={Product} />
            <Route path="/list" exact component={ProductList} />
          </Switch>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
