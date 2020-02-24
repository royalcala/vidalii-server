import { createConnection, getManager } from "typeorm";
console.log('in @vidalii/db')

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
createConnection().then(async connection => {
    console.log('%c⧭', 'color: #f2ceb6', Object.keys(connection));
    console.log('%c⧭', 'color: #00e600', 'name:', connection.name);
    // console.log('%c⧭', 'color: #00e600', 'entity', connection.entityMetadatas);
    // console.log('%c⧭', 'color: #00e600', connection.driver);

    const entityManager = getManager()//connection     
    let category = {};
    category.name = "category1";

    let response = await entityManager.save('category', category)
    // await connection.manager.save(photo);
    console.log("Photo has been saved");
    // let savedPhotos = await connection.manager.find(Photo);
    // console.log("All photos from the db: ", savedPhotos);

}).catch(error => console.log(error));