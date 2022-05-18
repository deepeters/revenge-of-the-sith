import React from "react";

import MyToast from "./MyToast";

import axios from "axios";

import { useQuery, gql } from "@apollo/client";

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

const { data, loading, error } = useQuery(PEOPLE_QUERY);

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  if(loading) {
    return "Loading...";
  }
  if(error) {
    return <pre>{error.message}</pre>;
  }

  render() {
    return (
      <div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} />
            People List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mass</th>
                  <th>Height</th>
                  <th>Gender</th>
                  <th>Homeworld</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.people.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6"> No People Available</td>
                  </tr>
                ) : (
                  this.state.people.map((people) => (
                    <tr key={people.id}>
                      <td>{people.name}</td>
                      <td>{people.mass}</td>
                      <td>{people.height}</td>
                      <td>{people.gender}</td>
                      <td>{people.homeword}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"details/" + people.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button size="sm" variant="outline-danger" onClick={this.deleteProduct.bind(this, people.id)}>
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

export default People;
