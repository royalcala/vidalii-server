import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
// import IndexCrud from './components/IndexCrud/'
// import { COMBINED } from './components/IndexCrud/FindCombined'
// import { IS_LOGGED_IN } from './components/IndexCrud/FindLocal'
// import { GET_CATALOGUES_MATERIALS } from './components/IndexCrud/Queries'
// import {createConnection} from "typeorm";
import ManagerDB from './components/ManagerDB'
import FormGql from "./components/FormGql"
const typeDefs = gql`
extend type catalogue_materials {
    _id:ID
    name:String
    isInCart: String
  }
  extend type state {
      id:ID
        name: String
        hola:String
      #  stateNested:stateNested
    }
  #   extend type stateNested {
  #      id:ID
  #       name: String
  #       otherValue:String
  #   }
    
  extend type Query {
    isLoggedIn: String
    find_catalogue_materials:[catalogue_materials]
  
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;

const resolvers = {
  //resolvers for backend in local @client
  state: {
    // hola: (parent) => {
    //   return 'holis'
    // },
    // stateNested: (parent) => { //@client resolvers
    //   console.log('parent::', parent)
    // }
  },
  catalogue_materials: {
    isInCart: (parent, _, { cache }) => {
      console.log('IN LOCAL RESOLVER:isInCart')
      console.log('parent::', parent)
      // const queryResult = cache.readQuery({
      //   query: IS_LOGGED_IN
      // });

      // console.log('queryResult::', queryResult)
      // console.log('parent::', parent)
      return 'yes is in cart'
    }
  },
  Query: {
    find_catalogue_materials: (parent, args, { cache }) => {
      console.log('IN LOCAL RESOLVER find_catalogue_materials**********')
      console.log('parent::', parent)
      parent.find_catalogue_materials[0] = {
        ...parent.find_catalogue_materials[0],
        _id: '200'
      }
      // console.log('parent::', parent.find_catalogue_materials[])
      // let dataFromLocalResolver = cache.readQuery({
      //   query: gql`
      // find_catalogue_materials{
      //   _id
      //   name
      // }` });
      // console.log('dataFromLocalResolver::', dataFromLocalResolver)
      // return dataFromLocalResolver
      // return parent
    }
  }
};
export const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

export const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors::', graphQLErrors)
    console.log('networkError::', networkError)
  },
  typeDefs,
  resolvers,
});
//initialCache
// cache.writeData({
//   data: {
//     isLoggedIn: 'Data From Cache',
//     cartItems: [],
//     // find_catalogue_materials: [
//     //   { __typename: 'catalogue_materials', _id: 100, name: 'Rao material' }
//     // ]
//   }
// });
// cache.writeQuery({
//   query: GET_CATALOGUES_MATERIALS,
//   data: { catalogue_materials: [{ _id: 100, __typename: 'catalogue_materials', name: 'Rao material', }] }
// });
// cache.writeData({
//   data: {
//     __typename: 'catalogue_materials',
//     _id: 100,
//     name: 'Rao material'
//   }
// });
// cache.writeData({
//   data: {
//     __typename: 'catalogue_materials',
//     _id: 101,
//     name: 'Rao material'
//   }
// });
// Helper function to get data from the cache
//   const getState = (query: any): IState => {
//     return cache.readQuery<IRoot>({ query }).state;
// };
// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log('graphQLErrors::', graphQLErrors)
//     console.log('networkError::', networkError)
//   }
// })
// const Div = React.createElement(
//   'div',
//   {className: 'sidebar'},
//   'Click Me'
// )
// const Rao = React.createElement(
//   Div,
//   { color: { hola: 'world' }, shadowSize: 2 },
//   'Click Me'
// )
const RenderComponent = gql`{
  View1 @directive{
    div
  }
}`
console.log('RenderComponent::', RenderComponent)
function App() {
  console.log('Render RootApp')
  // return Rao
  return (
    <ApolloProvider client={client}>
      <div>Login</div>
      <ManagerDB />
      <FormGql />
    </ApolloProvider>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
