import React from "react";

import MyToast from "./MyToast";

import axios from "axios";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const PEOPLE_QUERY = gql`
  {
    people {
      name
      mass
      height
      gender
      homeword
    }
  }
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://supermatt-backend.herokuapp.com/products")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ products: data });
      });
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast show={this.state.show} message={"Product Deleted Successfully."} type={"danger"} />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} />
            <People></People> List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mass</th>
                  <th>Height</th>
                  <th>Gender</th>
                  <th>Homeworld</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.people.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6"> No People Available</td>
                  </tr>
                ) : (
                  this.state.people.map((people) => (
                    <tr key={product.id}>
                      <td>{people.name}</td>
                      <td>{people.mass}</td>
                      <td>{people.height}</td>
                      <td>{people.gender}</td>
                      <td>{people.homeword}</td>
                      <td>Details</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"details/" + product.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProductList;
