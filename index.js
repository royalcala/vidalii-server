const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
var cors = require('cors');
var bodyParser = require('body-parser')

const { ApolloServer, gql } = require('apollo-server-express');
const { readFileSync } = require('fs')
const uuidv4 = require('uuid/v4')
var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')
const validator = require('./toPackage/validatorSchema')
const schemas = require('./toPackage/vidaliiDB')

//start pouchdb


async function startServer() {
    var app = express();
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
        },
    };
    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app });

    app.use(require('express-pouchdb')(PouchDB));

    await app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
    // var db = await new PouchDB('schemas');

    // await db.put({
    //     _id: 'dave@gmail.com',
    //     name: 'David',
    //     age: 69
    // });

}
startServer()



const myschemas = schemas({})
// var s = "0"
// console.log('String::', Boolean(s))
const types = require('./toPackage/valuesTypes')

// console.log('types:', types)
console.log(
    'custom::', types.custom({
        fx: () => 'hi',
        type: 'StringCustom'
    })
)

const updateDoc = require('./toPackage/updateDoc')

const prevDoc = {
    // C: [{ _id: 1, field1: 'hellow world' }],
    a: 'Im previus',
    b: 'only on prev Doc',
    D: {
        // E: [{ _id: 1, field1: 'hellow world' }],
        misArrays1: [
            {
                _id: 0,
                field: 'im only on prev Doc'
            },
            {
                _id: 1,
                field1: 'im in Both and im prev',
                misArrays1sub1: [{
                    _id: 2, field: 'im prev',
                    misArrays1sub1sub1: [
                        { _id: 1, field: 'im in Both and im prev' },
                        { _id: 2, field: 'im prev' }
                    ]
                }]
            },
        ]
    }
}

const newDoc = {
    // C: [{ _id: 1, field1: 'hellow world' }],
    a: 'im the new one',
    c: 'only on new Doc',
    D: {
        // E: [{ _id: 1, field1: 'hellow world' }],
        misArrays1: [
            {
                _id: 0.1,
                field: 'im only on new Doc'
            },
            {
                _id: 1,
                field1: 'im in Both and im new',
                misArrays1sub1: [{
                    _id: 2, field: 'im new',
                    misArrays1sub1sub1: [
                        { _id: 1, field: 'im in Both and im new' },
                        { _id: 3, field: 'im new' }
                    ]
                }]
            },
        ]
    }
}

var resultDoc = updateDoc({ idName: '_id', prevDoc, newDoc })

const hola = () => {
    return 'im hola'
}
hola.type = 'string'
var d1 = {
    a: hola
}
// console.log('type', d1.a.type)

const customs = ({ type = null, validator = null }) => {
    var newFx = () => 'im newFx'
    newFx.type = type
    return newFx
}
var d2 = {
    a: customs({ type: 'string' })
}

// console.log('customs', d2.a.type)




myschemas.loadSchema({
    name: 'schema1',
    schemaValidator: {
        a: ({ newValue }) => newValue,
        b: [{ a: ({ newValue }) => newValue }]
    },
    // typeDB:'pouchDB',
    url: 'http://admin:admin@localhost:5984',
    db: 'vidaliiserver',
    // username: 'admin',
    // password: 'admin'
})

myschemas.loadSchema({
    name: 'schema2',
    schemaValidator: {
        a: () => 1
    }
})

// console.log('printSchemas::',
//     myschemas.printSchemas()
// )
// console.log('insert',
//     myschemas.models().schema1.insert({ a: 'first document' }).then(e => console.log(e))
// )
// console.log('update',
//     myschemas.models().schema1.update({ _id: 'hola', a: 'first', b: [{ a: '1' }] }).then(e => console.log(e))
// )
// var dataBase = new PouchDB(`http://admin:admin@localhost:5984/vidaliiserver`);
// for (let index = 0; index < 10000; index++) {
//     console.log(index)
//     // myschemas.models().schema1.insert({ a: 'first document' })
//     dataBase.put({ _id: uuidv4(), a: 'first document' });
// }
// console.log('fin')
// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// console.log(uuidv4())

// Provide resolver functions for your schema fields


// var a = {
//     a: 1,
//     b: [{ id: 1, b: 1 }]
// }
// var b = {
//     a: 2,
//     b: [{ id: 2, b: 2 }]
// }
// console.log('Merge::',
//     R.mergeWithKey(a, b)
// )

// const schemaValidator = {
//     a: ({ newValue, prevDoc, newDoc }) => {
//         // console.log('previosDoc', prevDoc)
//         // console.log('newDoc', newDoc)
//         return newValue
//     },
//     b: ({ newValue, prevDoc, newDoc }) => {
//         return newValue
//     },
//     c: {
//         d: ({ prevDoc }) => {
//             // console.log('previosDoc', prevDoc)
//             return 'yes working'
//         }, f: () => 200
//     },
//     d: [{
//         a: ({ newValue, prevDoc }) => {
//             // console.log('previosDoc', prevDoc)
//             // console.log('newDoc', newDoc)
//             return newValue
//         }, b: () => 22
//     }],
//     f: { a: { a: () => 'Jalo' } }
// }

// const prevDoc = {
//     a: 1,
//     b: 2,
//     // c: { d: 1, f: 2 }
// }

// var newDoc = {
//     a: 2,
//     b: 3,
//     c: { d: 1, f: 2 },
//     f: { a: { a: 1 } }
// }

// var newDoc2 = {
//     id:'jaja',
//     a: 2,
//     b: 1,
//     c: { d: 1, f: 2 },
//     d: [{ a: 1, b: 2 }, { a: 2, b: 33 }],
//     f: { a: { a: 1 } }
// }

// var result = validator({
//     schemaValidator,
//     prevDoc,
//     // newDoc,
//     newDoc: newDoc2
// })

// console.log('RESULT:', result)



