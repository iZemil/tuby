const express = require('express');

const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    // ejs render automatically looks in the views folder
    res.render('index');
});

app.listen(port, function() {
    console.log('App is running on:' + port);
});