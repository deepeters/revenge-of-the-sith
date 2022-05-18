import React from "react";

import axios from "axios";

import MyToast from "./MyToast";

import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusSquare, faUndo, faList, faEdit } from "@fortawesome/free-solid-svg-icons";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.productChange = this.productChange.bind(this);
    this.submitProduct = this.submitProduct.bind(this);
  }

  initialState = {
    id: "",
    name: "",
    category: "",
    description: "",
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    console.log(productId);
    if (productId) {
      this.findProductById(productId);
      console.log(this.findProductById(productId));
    }
  }

  findProductById = (productId) => {
    axios
      .get("https://supermatt-backend.herokuapp.com/products/" + productId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            category: response.data.category,
            description: response.data.description,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  resetProduct = () => {
    this.setState(() => this.initialState);
  };

  submitProduct = (event) => {
    event.preventDefault();

    const product = {
      name: this.state.name,
      category: this.state.category,
      id: this.state.id,
      description: this.state.description,
    };

    axios.post("https://supermatt-backend.herokuapp.com/products", product).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  updateProduct = (event) => {
    event.preventDefault();

    const product = {
      name: this.state.name,
      category: this.state.category,
      id: this.state.id,
      description: this.state.description,
    };

    axios.put("https://supermatt-backend.herokuapp.com/products", product).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
        setTimeout(() => this.productList(), 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  productChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  productList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { id, name, category, description } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={this.state.method === "put" ? "Product Updated Successfully." : "Product Added Successfully."}
            type={"success"}
          />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
            {this.props.match.params.id ? "Update Product" : "Add Product"}
          </Card.Header>
          <Form
            onReset={this.resetProduct}
            onSubmit={this.props.match.params.id ? this.updateProduct : this.submitProduct}
            id="productFormId"
          >
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group as={Col} controlId="formGridId">
                    <Form.Label>Product #</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      name="id"
                      value={id}
                      onChange={this.productChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Product ID"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.productChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Product Name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      name="category"
                      value={category}
                      onChange={this.productChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Product Category"
                    />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.productChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Product Description"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> {this.props.match.params.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} />
                Reset
              </Button>{" "}
              <Button size="sm" variant="info" type="button" onClick={this.productList.bind()}>
                <FontAwesomeIcon icon={faList} /> Product List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Product;
