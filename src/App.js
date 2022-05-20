import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Container, Row } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Person from "./components/Person";
import People from "./components/People";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": "9chUOpqoidro3nq37SuAMfYxAFUos3sEcgmqCQDaN6x7GbPwxNdFMSc7yLdfEfEK",
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://the-force-awakens.hasura.app/v1/graphqll",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
