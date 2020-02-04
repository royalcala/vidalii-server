import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const FIELDS = gql`
  query typeStructure($typeName: String!) {
    structureFields:__type(name: $typeName) {
      name
      inputFields{
      name
      type{
          kind
          name
      }
    }
    }

  }
`;

export default function Main() {
    const { loading, error, data } = useQuery(FIELDS, {
        variables: { typeName: 'Connection_add' },
    });
    if (loading) return <p>Loading1 ...</p>;
    if (error) return `Error! ${error}`;
    // return <p>Hello Im FormGql: {JSON.stringify(data)}</p>;
    return <RenderForm data={data} />
}

function RenderForm(props) {
    console.log('props::', props)

    return <div>In RenderForm</div>

}