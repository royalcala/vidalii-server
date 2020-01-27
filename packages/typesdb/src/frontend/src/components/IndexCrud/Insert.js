import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const INSERT_CATALOGUE_MATERIALS = gql`
  mutation nameMutation($data: JSON!) {
    insert_catalogue_materials(data: $data) {
      _id
      name
    }
  }
`;
export default (props) => {
    // console.log('props::',props)
    console.log('rendering Insert')
    const initState = {
        _id: '',
        name: ''
    }
    const [state, setState] = useState(initState);
    const [mutateData, { data }] = useMutation(INSERT_CATALOGUE_MATERIALS);

    return (
        <div>
            <h3>Insert:</h3>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    mutateData({
                        variables: {
                            data: { ...state }
                        }
                    });
                    setState(initState)
                    const [s, set] = props.reloadFind
                    set(s + 1)

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
    );
}