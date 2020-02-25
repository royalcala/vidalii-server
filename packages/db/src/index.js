require('dotenv').config()
import { createConnection, getManager } from "typeorm";
console.log('in @vidalii/db')
// /home/vidalii/Documents/softwareCodes/vidalii-server/packages/typesdb/src/old/backendOld/databases/crud/applyFilters.js
import gql from "#src/services/gql";


// createConnection().then(async connection => {
//     const entityManager = getManager()//connection     
//     let category = {};
//     category.name = "category1";

//     let response = await entityManager.save('category', category)    
//     console.log("Photo has been saved");

// }).catch(error => console.log(error));