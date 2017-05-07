var OrientDB = require('orientjs');

var server = OrientDB({
   host:       '192.168.0.222',
   port:       2424,
   username:   'root',
   password:   'root'
});

var db = server.use('o2')
console.log('Using Database:'  + db.name);

// var rec = db.record.get('#21:0').then(function(record){
//   console.log('Loaded Record:', record);
// });

// var sql = 'select from topic';
// db.query(sql).then(function(records){
//   console.log(records);
// });
/*
var sql = 'select from topic where @rid=:rid';
var param = {
  params:{
    rid:'#21:0'
  }
}
db.query(sql, param).then(function(records){
   console.log(records);
});
*/
/*
var sql = "insert into topic(title, description) values(:title, :desc)";

var param = {
    params:{
        title:"Express",
        desc:"Express is framework for web"
    }
}
db.query(sql, param).then(function(results){
    console.log(results);
});
*/
/*
var sql = "update topic set title=:title where @rid=:rid";
db.query(sql, {params:{title:"ExpressJS", rid:"#23:0"}}).then(function(results){
    console.log(results);
});
*/

var sql = "delete from topic where @rid=:rid";
db.query(sql, {params:{rid:"#22:0"}}).then(function(results){
    console.log(results);
});