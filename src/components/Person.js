import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const PERSON_QUERY = gql`
  query getPerson($name: String!) {
    getPerson(name: $name) {
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
  const { loading, error, data: personData } = useQuery(PERSON_QUERY);
  const { name } = useParams();
  console.log(name);
  return <div className="look">Person</div>;
}

export default Person;
