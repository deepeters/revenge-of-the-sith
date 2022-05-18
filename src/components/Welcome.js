import React from "react";
import { Col } from "react-bootstrap";

class Welcome extends React.Component {
  render() {
    return (
      <Col lg={12} className="bg-dark text-white">
        <h1>Welcome to the Star Wars Application</h1>
        <p>We may act calm and composed but we cannot wait for the Obi-Wan Kenobi Show and the third season of The Mandalorian</p>
        <footer className="blockquote-footer">By Management - This is the way!</footer>
      </Col>
    );
  }
}

export default Welcome;
