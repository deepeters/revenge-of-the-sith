import React from "react";

import MyToast from "./MyToast";

import axios from "axios";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  deleteProduct = (productId) => {
    axios.delete("https://supermatt-backend.herokuapp.com/products/" + productId).then((response) => {
      if (response.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.setState({
          products: this.state.products.filter((product) => product.id !== productId),
        });
      } else {
        this.setState({ show: false });
      }
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast show={this.state.show} message={"Product Deleted Successfully."} type={"danger"} />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} />
            Product List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Product Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6"> No Products Available</td>
                  </tr>
                ) : (
                  this.state.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"edit/" + product.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteProduct.bind(this, product.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
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
