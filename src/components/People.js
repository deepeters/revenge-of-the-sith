import React from "react";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

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
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <Card.Header className="text-white">
        <FontAwesomeIcon icon={faList} />
        <span> PeopleList</span>
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
                <th>Actions</th>
              </tr>
            </thead>
            {peopleData.getPeople.results.map(({ url, name, mass, homeworld, height, gender }) => (
              <tbody key={name}>
                <tr key={name}>
                  <td>{name}</td>
                  <td>{mass}</td>
                  <td>{height}</td>
                  <td>{gender}</td>
                  <td>{homeworld}</td>
                  {/* <td>{url}</td> */}
                  <td>
                    <ButtonGroup>
                      <Link to={`/person/${name}`} className="btn btn-sm btn-outline-primary">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      </Link>{" "}
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default People;
