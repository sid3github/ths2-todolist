const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 mongoose.connect('mongodb://127.0.0.1/Todo');
mongoose.Promise = Promise;

const todoSchema = new mongoose.Schema({
    item: String,
});
let Todo = mongoose.model('Todo',todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports =(app)=>{

    app.get('/todo',(req,res)=>{
    Todo.find((err,data)=>{
        if(err) throw err;
        res.render('todo',{todos: data});
    });
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        let newTodo = Todo(req.body).save((err,data)=>{
        if(err) throw err;
        res.json(data);
    })
    });

    app.delete('/todo/:item',(req,res)=>{

        Todo.find({item: req.params.item.replace(/ /g,'-')}).remove((err,data)=>{
            if (err) throw err;
            res.json(data);
        });
    });
};