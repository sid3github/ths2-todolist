const express = require('express');
const todoController = require('./controllers/todoController');

let app = express();



app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);


app.listen(5000, ()=>{
   console.log('You are running on port: 5000');
});