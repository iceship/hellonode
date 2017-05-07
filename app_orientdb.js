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

app.get('/topic/add', function(req, res){
    var sql = 'select from topic';
    db.query(sql).then(function(topics){
        if(topics.length === 0){
            console.log('There is no topic record.');
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics:topics});
    });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'insert into topic (title, description, author) values (:title, :desc, :author)';
  db.query(sql, {params: { 
      title:title,
      desc:description,
      author:author
  }}).then(function(records){
    //console.log(records);
    res.redirect('/topic/'+ records[0].title);
  });
});

app.get('/topic/:topic/edit', function(req, res){
    var topic = req.params.topic;
    var sql = 'select from topic where title=:topic';
    db.query(sql, {params:{topic:topic}}).then(function(topics){
        if(topics.length === 0){
            console.log('There is no topic record.');
            res.status(500).send('Internal Server Error');
        }
            console.log(topics[0]);
        res.render('edit', {topic:topics[0]});
    });
});


app.get(['/topic', '/topic/:topic'], function(req, res){
  var sql = 'select from topic';
  db.query(sql).then(function(records){
    var topic = req.params.topic;
    if(topic){
      var sql = 'select from topic where title=:title';
      db.query(sql, {params:{title:topic}}).then(function(record){
        
        res.render('view', {topics:records,topic:record[0]});
      });
    } else {
        //var topic = {title:"Hello", description:"World!"};
        res.render('view', {topics:records}); //,topic:topic});
    };
  });
});



app.listen(3000, function(){
    console.log('Connected, 3000 port')
});
