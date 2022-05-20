import React, { useState, useEffect } from "react";

import MyToast from "./MyToast";

import axios from "axios";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const PEOPLE_QUERY = gql`
  query MyQuery {
    getPeople {
      results {
        url
        name
        mass
        homeworld
        height
        gender
      }
    }
  }
`;

function People() {
  const { loading, error, data: peopleData } = useQuery(PEOPLE_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre className="look">{error.message}</pre>;

  console.log(peopleData);
  return (
    <>
      <Card.Header className="text-white">
        <FontAwesomeIcon icon={faList} />
        <span> PeopleList</span>
      </Card.Header>
      {peopleData.getPeople.results.map(({ url, name, mass, homeworld, height, gender }) => (
        <div key={name}>
          <Card className="border border-dark bg-dark text-white">
            <Card.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Name</th>
                    <th>Mass</th>
                    <th>Height</th>
                    <th>Gender</th>
                    <th>Homeworld</th>
                    <th>URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {this.state.people.length === 0 ? (
                <tr align="center">
                  <td colSpan="6"> No People Available</td>
                </tr>
              ) : (
                this.state.people.map((people) => ( */}
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{mass}</td>
                    <td>{height}</td>
                    <td>{gender}</td>
                    <td>{homeworld}</td>
                    <td>{url}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/person/${name}`} className="btn btn-sm btn-outline-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                        {/* <Button size="sm" variant="outline-danger" onClick={this.deleteProduct.bind(this, people.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button> */}
                      </ButtonGroup>
                    </td>
                  </tr>
                  {/* ))
              )} */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}

export default People;
