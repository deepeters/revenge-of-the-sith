import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          <img
            alt="cart"
            src="https://icons-for-free.com/iconfiles/png/512/hunter+robot+spacecraft+starwars+icon-1320166696320991237.png"
            width={100}
          ></img>
          Star Wars
        </Link>
        <Nav className="me-auto">
          <Link to={""} className="nav-link">
            Home
          </Link>
          <Link to={"/list"} className="nav-link">
            People
          </Link>
          <Link to={"/add"} className="nav-link">
            Person
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
