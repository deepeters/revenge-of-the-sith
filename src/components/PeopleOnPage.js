import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import { Card, Table, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const PAGE_QUERY = gql`
  query getPage($page: Int!) {
    getpage(page: $page) {
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
  const { loading, error, data: personData } = useQuery(PAGE_QUERY);
  const { name } = useParams();
  console.log(name);
  return <div className="look">Person</div>;
}

export default Person;
