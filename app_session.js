var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'fdsibuepu#hwr3h89!dsafn#ewoi3208r!eoiwnd#safdsafn!adshf#bewb397',
    resave: false,
    saveUninitialized: true
}));

app.get('/count', function(req, res){
    if(req.session.count) {
        req.session.count++
    } else {
        req.session.count = 1;
    }

    res.send('count:' + req.session.count);
});

app.post('/auth/login', function(req, res){
    var user = {
        username:'iceship',
        password:'1111',
        displayName:'Juil Kim',
    };
    var uname = req.body.Username;
    var pwd = req.body.Password;

    if(user.password === pwd && user.username === uname){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    } else {
        res.send('Who are you? <a href="/auth/login">login</a>');    
    }

});

app.get('/welcome', function(req, res){
    if(req.session.displayName) {
        res.send('<h1>Welcome ' + req.session.displayName + '</h1> <a href="/auth/logout">logout</a>' );
    } else {
        res.send('<h1>Welcome.</h1> <a href="/auth/login">login</a>' );
    }
});

app.get('/auth/logout', function(req, res){
    if(req.session.displayName) {
        delete req.session.displayName;
        //req.session.destroy(); 
        res.redirect('/auth/login');
        //res.send('<h1>Welcome ' + req.session.displayName + '</h1> <a href="/auth/logout">logout</a>' );
    } else {
        res.redirect('/auth/login');
    }    
});


app.get('/auth/login', function(req, res){
    if(req.session.displayName){
        res.redirect('/welcome');
    } 

    var output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="Username" placeholder="username">
            </p><p>
                <input type="password" name="Password" placeholder="password">
            </p><p>
                <input type="submit">
            </p>
        </form>
    `
    res.send(output);
});



app.listen(3003, function(){
    console.log('Connected, 3003 port');
    
})
