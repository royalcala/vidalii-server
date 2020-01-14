import createServicesGQL from './createServicesGQL'
// import createTypes from './createTypes'
// import createSearchByTypeDef from './createSearchByTypeDef'
const { ApolloServer, gql } = require('apollo-server-fastify');

// const books = [
//     {
//         title: 'Harry Potter and the Chamber of Secrets',
//         author: 'J.K. Rowling',
//     },
//     {
//         title: 'Jurassic Park',
//         author: 'Michael Crichton',
//     },
// ]
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
}



export default async ({ name, schema, db }) => {
    const servicesGQL = createServicesGQL({ name, schema, db })
    console.log('servicesGQL::', servicesGQL)
    // const typeDefs = createTypes({ name, schema })
    // console.log('typeDefs::', typeDefs.obj)
    // const queries = createSearchByTypeDef({
    //     name,
    //     db,
    //     oTypesDef: typesDefs.obj
    // })
    // return new ApolloServer({
    //     typeDefs: gql(`
    //     ${typeDefs.string}
    //     ${queries}
    //     `),
    //     resolvers,
    // })
}

// const app = require('fastify')();

// (async function () {
//   app.register(server.createHandler());
//   await app.listen(3000);
// })();
