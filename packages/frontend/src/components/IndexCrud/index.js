import React from 'react';
import Find from './Find'
import FindLocal from './FindLocal'
import FindCombined from "./FindCombined";
import Insert from "./Insert";
import TestCache from "./TestCache";
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
    console.log('In Index')
    // const reloadFind = useState(0);
    // console.log('reloadFind::', reloadFind)
    return (
        <>
            <TestCache />
            {/* <FindLocal /> */}
            {/* <Insert />
            Find From Server:
            <Find />
            <hr/>
            Finde From Server And Cache:
            <FindCombined /> */}
        </>
    )
}