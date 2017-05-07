var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.locals.pretty = true;
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
//app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.get('/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req ,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});
app.post('/form_receiver', function(req ,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
});

app.get('/topic', function(req, res){
    var topics = [
        'Javascript is ...',
        'Node.JS is ...',
        'Express is ...',
        'Test is ...',
    ];
    var str = `
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">Node.JS</a><br>
        <a href="/topic?id=2">Express</a><br>
        <a href="/topic?id=3">Test</a><br>
    `;
    var output = str + topics[req.query.id];
    res.send(output);
});

app.get('/topic/:id', function(req, res){
    var topics = [
        'Javascript is ...',
        'Node.JS is ...',
        'Express is ...',
        'Test is ...',
    ];
    var str = `
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">Node.JS</a><br>
        <a href="/topic/2">Express</a><br>
        <a href="/topic/3">Test</a><br>
    `;    
    var output = str + topics[req.params.id];
    res.send(output);    
});


app.get('/template', function(req, res){
    res.render('temp', {time:Date(), title:'Pug'})
});

app.get('/login', function(req, res){
    res.send('Login Please');
});

app.get('/route', function(req, res){
    res.send('Hello router, <img src="/iceship.jpg">');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});


