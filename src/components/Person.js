import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faArrowAltCircleLeft, faSmile, faUndo } from "@fortawesome/free-solid-svg-icons";

const PERSON_QUERY = gql`
  query getPerson($name: String!) {
    person(name: $name) {
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

function Person() {
  const {
    loading,
    error,
    data: personData,
  } = useQuery(PERSON_QUERY, {
    variables: { name },
  });

  const { name } = useParams();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Card.Header className="text-white">
        <FontAwesomeIcon icon={faSmile} />
        <span> Person </span>
      </Card.Header>

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
                {/* <th>URL</th> */}
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            {personData.getPerson.results.map(({ url, name, mass, homeworld, height, gender }) => (
              <tbody key={name}>
                <tr key={name}>
                  <td>{name}</td>
                  <td>{mass}</td>
                  <td>{height}</td>
                  <td>{gender}</td>
                  <td>{homeworld}</td>
                  {/* <td>{url}</td> */}
                  {/* <td>
                    <ButtonGroup>
                      <Link to={`/person/${name}`} className="btn btn-sm btn-outline-primary">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      </Link>{" "}
                    </ButtonGroup>
                  </td> */}
                </tr>
              </tbody>
            ))}
          </Table>
        </Card.Body>
        <Card.Footer style={{ textAlign: "right" }}>
          <Button size="sm" variant="info" type="reset">
            <FontAwesomeIcon icon={faUndo} />
            Home
          </Button>{" "}
          <Button size="sm" variant="info" type="button" onClick={this.peopleData.bind()}>
            <FontAwesomeIcon icon={faList} /> People List
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Person;
