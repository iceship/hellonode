var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser())

var products = {
    1:{title:'The history of web 1'},
    2:{title:'The next web'},
};

app.get('/products', function(req, res){
    var output = ''
    for(var product in products){
        output += `
            <li>
                <a href="/cart/${product}">${products[product].title}</a>
            </li>`
        //console.log(products[product].title);
    }

    res.send(`
        <h1>Products</h1><ul>${output}</ul>
        <a href="/cart">Cart</a>
    `);

});


app.get('/cart', function(req,res){
    var cart = req.cookies.cart;
    if(!cart){
        res.send('Empty!');
    } else {
        var output = '';
        for(var id in cart){
            output += `
                <li>
                    <a href="/cart/${id}">${products[id].title}</a> (${cart[id]}) - <a href="/cart/delete/${id}">Delete</a>
                </li>`            
            }

    };
        
    res.send(`
        <h1>Cart</h1><ul>${output}</ul>
        <a href="/products">Products List</a>
    `);    
    
});



app.get('/cart/:id', function(req,res){
    var id = req.params.id;
    var cart = {};
    if(req.cookies.cart){
        cart = req.cookies.cart;
    }
    if(cart[id]) {
        cart[id] = parseInt(cart[id]) + 1;
    } else {
        cart[id] = 1;
    }
    res.cookie('cart', cart);
    res.redirect('/cart');
});

app.get('/cart/delete/:id', function(req,res){
    var id = req.params.id;
    var cart = {};
    if(req.cookies.cart){
        cart = req.cookies.cart;
    }
    if(cart[id]) {
        cart[id] = parseInt(cart[id]) - 1;
    }
    if(cart[id]===0)
        delete cart[id];
    res.cookie('cart', cart);
    res.redirect('/cart');
});


app.get('/count', function(req, res){
    var count = 0;
    if(req.cookies.count){
        count = parseInt(req.cookies.count);
    }
    count = count + 1;
    res.cookie('count', count);
    res.send('count: '+ count);
    
});

app.listen(3003, function(){
    console.log('Connected, 3003 port');

})