const axios = require("axios")


//created in src/server/index.js
let instance = {}
export const createLocalFetch = async ({ port }) => {
    instance = {
        url: `http://127.0.0.1:${port}/graphql`,
        method: 'post'
    }
}

//after created can be used in wherever path in your app
export const localFetch = ({ query, variables = {} }) => {
    return axios({
        url: instance.url,
        method: instance.method,
        data: {
            query,
            variables
        }
    })
}

// axios({
//     url: 'https://1jzxrj179.lp.gql.zone/graphql',
//     method: 'post',
//     data: {
//         query: `
//         query PostsForAuthor {
//           author(id: 1) {
//             firstName
//               posts {
//                 title
//                 votes
//               }
//             }
//           }
//         `
//     }
// }).then((result) => {
//     console.log(result.data)
// });

