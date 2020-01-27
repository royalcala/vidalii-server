import React, { useState } from 'react';
import Find from './Find'
import Insert from "./Insert";
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';

// const GET_CATALOGUES_MATERIALS = gql`
//   {
//     find_catalogue_materials {
//       _id
//       name
//     }
//   }
// `;

export default () => {
    const reloadFind = useState(0);
    console.log('reloadFind::', reloadFind)
    return (
        <>
            <Insert reloadFind={[...reloadFind]} />
            <Find reloadFind={[...reloadFind]} />
        </>
    )
}