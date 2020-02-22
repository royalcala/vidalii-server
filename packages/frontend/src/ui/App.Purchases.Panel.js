import React from 'react'
import Breadcrumb from "ui/BreadCrumb.Simple";

// const typeDef_db_query = `{
//     extend type db_query{
//         myQuery
//     }
// }`
//create sites
//create sites->connections
//create queries,


//tags-->${}
const typeDefsServiceDB = `
type Query{
    query(name:String):String
}
`
const connectionMyFirst = `@db(connection:'myFirstDbSqlite)`
const typeDefsRouter = `
type Unit{
    id:ID
    name:String
}

type Catalogue_item{
    id:ID
    name:String
    unit:Unit
}

type Purchase_Header{
"internal id, invoice number, folio ...etc"
id:String

}
type Purchase_Item{
id:ID
itemDetails:Item
cant:Number

}
type Purchase @db(connection:'myFirstDBSite1){
    id:ID @unique
    created_date:Date <<<---dateScalar
    created_by:User
    connection:CONNECTION
    header:Purchases_Header
    purchase_items:[Purchase_item]
}
enum SITE{
    all
    site1
    site2
}
enum CONNNECTION{
    connection1
    connection2
}
extend type Query{
purchase_panel(page:Number,connection:[CONNECTION]):[Purchase] @db_query(name:'myFirstQuery')
}
`

const query = `{
    purchases_panel{

    }
}`
const PurchasesPanel = () => {
    return (
        <>
            <Breadcrumb manualPath={['Purchases', 'Panel']} />
            <div>on App.Purchases Panel</div>
        </>
    )
}

export default PurchasesPanel