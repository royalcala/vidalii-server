console.log('in withSqlite')
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
});
knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('users', function (t) {
      t.uuid('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  }
});

var tableMat = {
  1: { name: 'rao' },
  2: { name: 'rao2' },
  '3': { name: 'rao3' },
}

var obj1 = {
  a: 1,
  b: [
    { id_mat: tableMat[1], cant: 10 },
    { id_mat: 2, cant: 10 },
    { id_mat: 3, cant: 10 },
    { id_mat: tableMat['3'], cant: 10 }
  ]
}
console.log(
  JSON.stringify(obj1)
)

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');

// db.serialize(function () {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();