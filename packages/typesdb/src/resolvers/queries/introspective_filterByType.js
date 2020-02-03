import { query } from "../../instances/GraphqlServices";

module.exports = {
  fx: async (parent, { nameType, fields }) => {
    console.log('fields::', fields)
    // let response = await query(`{
    //         __schema{
    //           types{
    //             name                
    //             inputFields{
    //               name
    //               type{
    //                 name
    //               }
    //             }
    //           }
    //         }
    //       }`)
    let response = await query(`{
      __schema{
        types${fields}
      }
    }`)
    const filter = (response
      .data
      .__schema
      .types)
      .find(
        type => type.name === nameType
      )

    return filter
  }
}