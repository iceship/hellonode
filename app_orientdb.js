var express = require('express');
var bodyParser = require('body-parser');
var OrientDB = require('orientjs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var fs = require('fs');
var app = express();

app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));

var server = OrientDB({
   host:       '192.168.0.222',
   port:       2424,
   username:   'root',
   password:   'root'
});
var db = server.use('o2')

app.set('views', './views_orientdb');
app.set('view engine', 'pug');

app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});

app.get(['/topic', '/topic/:topic'], function(req, res){
  var sql = 'select from topic';
  db.query(sql).then(function(records){
    console.log(records);
  });

});

app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //res.send('Success');
    res.redirect('/topic/'+title);

  });
});

app.listen(3000, function(){
    console.log('Connected, 3000 port')
});
