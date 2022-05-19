import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Container, Row } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Person from "./components/Person";
import People from "./components/People";

const client = new ApolloClient({
  uri: "https://quick-catfish-88.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const marginTop = {
    marginTop: "20px",
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavigationBar />
        <Container style={marginTop}>
          <Row>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/details" exact component={Person} />
              <Route path="/list" exact component={People} />
            </Switch>
          </Row>
        </Container>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
