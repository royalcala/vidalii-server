import gql from 'graphql-tag';
export const GET_CATALOGUES_MATERIALS = gql`
 query Find {
    find_catalogue_materials{
      _id
      name
    }
  }
`;