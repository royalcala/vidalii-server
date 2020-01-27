import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CATALOGUES_MATERIALS = gql`
  {
    find_catalogue_materials {
      _id
      name
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_CATALOGUES_MATERIALS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('data::', data)
  let list = data.find_catalogue_materials
  return (
    <>
      <h3>Query:</h3>
      <ul>
        {list.map(({ _id, name }) => <li>_id:{_id}name:{name}</li>)}
      </ul>
      <h3>Insert:</h3>
      <h3>Update:</h3>

    </>
  )
}