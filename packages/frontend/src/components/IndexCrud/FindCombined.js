import React from 'react';
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const COMBINED = gql`
 query FindCombined{
    find_catalogue_materials(filter:{take:1,skip:1}) {
      _id
      name
      isInCart @client
    }
  }
`;

export default function Combined() {
  console.log('FindComgined.js')
  const { data, loading, error } = useQuery(COMBINED);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <div>json:{JSON.stringify(data)}</div>
    </>
  )
  // console.log('data::', data)
  // return (data.isLoggedIn ?
  //     <div>logged</div> :
  //     <div>Required Login</div>)
}