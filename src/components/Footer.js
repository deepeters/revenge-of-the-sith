import React from "react";
import { Navbar } from "react-bootstrap";
import { Container, Col } from "react-bootstrap";

class Footer extends React.Component {
  render() {
    let fullYear = new Date().getFullYear();

    return (
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Col lg={12} className="text-center text-muted">
            <div> {fullYear} - All Rights Reserved by Darth Vader</div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
