const R = require('ramda')
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { readFileSync } = require('fs')
const uuidv4 = require('uuid/v4')
var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')
const validator = require('./toPackage/myschema/validator')
// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// console.log(uuidv4())

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });


var a = {
    a: 1,
    b: { c: 'c' }
}
console.log(a['b']['c'])

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);



const schemaValidator = {
    a: ({ newValue, prevDoc, newDoc }) => {
        console.log('previosDoc', prevDoc)
        return newValue
    },
    b: ({ newValue, prevDoc, newDoc }) => {
        return newValue
    },
    c: {
        d: ({ prevDoc }) => {
            console.log('previosDoc', prevDoc)
            return 'yes working'
        }, f: () => 200
    },
    d: [{ a: ({ newValue }) => newValue, b: () => 22 }],
    f: { a: { a: () => 'Jalo' } }
}

const prevDoc = {
    a: 1,
    b: 2,
    // c: { d: 1, f: 2 }
}

var newDoc = {
    a: 2,
    b: 3,
    c: { d: 1, f: 2 },
    f: { a: { a: 1 } }
}

var newDoc2 = {
    a: 2,
    b: 1,
    c: { d: 1, f: 2 },
    d: [{ a: 1, b: 2 }, { a: 2, b: 33 }]
}

var result = validator({
    schemaValidator,
    prevDoc,
    // newDoc,
    newDoc: newDoc2
})

console.log('RESULT:', result)

