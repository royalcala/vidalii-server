import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATALOGUES_MATERIALS } from './Queries'


export default (props) => {
  console.log('In Find.js')
  const { loading, error, data, refetch } = useQuery(GET_CATALOGUES_MATERIALS)

  // useEffect(() => {
  //     if (data) {
  //       console.log('rendering Find with useEfect, and refetch with apollo')
  //       refetch()
  //     }
  // }, [props.reloadFind[0]])
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  let list = data.find_catalogue_materials
  return (
    <>
      <div>data:{JSON.stringify(data)}</div>
      {/* <ul>
        {list.map(({ _id, name }) => <li key={_id}>_id:{_id}, name:{name}</li>)}
      </ul> */}
    </>
  )
}