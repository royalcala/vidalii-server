import gql from "graphql-tag";

const desingStructure0 = [
    {
        _id: "uniqueId",
        component: "nameComponent",
        directives: ["nameFx", "state"],
        children: [
            {
                _id: "uniqueId",
                component: "nameComponent"
            }
        ]

    }
]

const query = gql`{
    sales{
        _id
        folio
        client
        materials{
            _id
            name
            cant
            unit
        }
        observations
        comments

    }
}`

const mutation = gql`{
    update_sales(json:{thisProperties table1, nametable:subPropsT})
}`
function manageHooks(props){
    useState()

    return props.children(state)
}
const desingStructure1 = {
    idComponent1: {
        component: "Form",
        directives: ['one', 'one'],
        children: {
            idComponent2: {
                component: "Box",
                directive: ['getValueState'],
                children: {
                    idComponent3: {
                        component: "Input",
                        value: "Initial"
                    }
                }
            }
        }
    }
}