var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser())

app.listen(3003, function(){
    console.log('Connected, 3003 port');

})
