import React, { useEffect } from 'react';
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

export default (props) => {
  const { loading, error, data, refetch } = useQuery(GET_CATALOGUES_MATERIALS,
    { fetchPolicy: 'no-cache' })
  console.log(`Rendering Find loading:${loading}`)
  useEffect(() => {
      if (data) {
        console.log('rendering Find with useEfect, and refetch with apollo')
        refetch()
      }
  }, [props.reloadFind[0]])
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('data::', data)
  let list = data.find_catalogue_materials
  return (
    <>
      <h3>Find:(GetALL)</h3>
      <ul>
        {list.map(({ _id, name }) => <li key={_id}>_id:{_id}, name:{name}</li>)}
      </ul>
    </>
  )
}