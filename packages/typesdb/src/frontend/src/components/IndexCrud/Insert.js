import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_CATALOGUES_MATERIALS } from "./Queries";

const INSERT_CATALOGUE_MATERIALS = gql`
  mutation nameMutation($data: JSON!) {
    insert_catalogue_materials(data: $data) {
      _id
      name
    }
  }
`;


const Form2 = ({ mutateData }) => {
  console.log('form2')
  const [state, setState] = React.useState({ _id: '', name: '' });
  return <div>
    <h3>Insert:</h3>
    <form
      onSubmit={async e => {
        console.log('in submittedForm')
        e.preventDefault();
        let response = await mutateData({
          variables: {
            data: { ...state }
          }
        });
        // console.log('response::', response)
        // setState({ _id: '', name: '' })
        // const [s, set] = props.reloadFind
        // set(s + 1)

      }}
    >
      _id:<input
        value={state._id}
        onChange={e => {
          setState({ ...state, ...{ _id: e.target.value } })
        }}
      />
      name:<input
        value={state.name}
        onChange={e => setState({ ...state, ...{ name: e.target.value } })}
      />

      <button type="submit">Add Material</button>
    </form>
  </div>
}

export default () => {
  console.log('In Insert')
  const [mutateData, { data, loading, error, called }] = useMutation(INSERT_CATALOGUE_MATERIALS,
    {
      update: (cache, data) => {
        try {
          let fromCache = cache.readQuery({ query: GET_CATALOGUES_MATERIALS })
          console.log('*******fromCache::', fromCache)
          console.log('data::', data)
          data.insert_catalogue_materials[0].name = 'nameeee'
          fromCache.find_catalogue_materials.push(data.insert_catalogue_materials[0])
          console.log('fromCache.find_catalogue_materials::',fromCache.find_catalogue_materials)
          cache.writeQuery({
            query: GET_CATALOGUES_MATERIALS,
            data: {
              'find_catalogue_materials': fromCache.find_catalogue_materials
            }
          });
          fromCache = cache.readQuery({ query: GET_CATALOGUES_MATERIALS })
          console.log('******2fromCache::', fromCache)
        } catch (e) {
          console.log('e::', e)
          // We should always catch here,
          // as the cache may be empty or the query may fail
        }
      }
    })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return <Form2 mutateData={mutateData} />

}

