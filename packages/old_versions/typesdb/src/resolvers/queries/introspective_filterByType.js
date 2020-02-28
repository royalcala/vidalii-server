import { query } from "../../instances/GraphqlServices";

module.exports = {
  fx: async (parent, { nameType, fields }) => {
    let response = await query(`{
      __types{
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