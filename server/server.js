 const _=require('lodash');
 const express=require('express');
 const bodyParser=require('body-parser'); //this is going to let us send json to the server.the server can take that json and do 
                                        //something with it.it take the string body and turns it into a javascript object.							
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();
const port=process.env.PORT||3000;   // it will set if app is running on Heroku other wise will take 3000 locally.
app.use(bodyParser.json()); // this will takes the middleware. if we are writing custom middleware it will be function.if we are using third party middleware we usually just access something off of the library. 

// we will hit a post request from postman with localhost:3000/todos url which will console the log.
app.post('/todos',(req,res)=>{
   // console.log(req.body);
    var todo=new Todo({ 
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    }); 
});

// // we will hit a post request from postman with localhost:3000/users url which will console the log.
// app.post('/users',(req,res)=>{
//     debugger;
//     // console.log(req.body);
//      var user=new User({ 
//         email:req.body.email
//      });
 
//      user.save().then((doc)=>{
//          res.send(doc);
//      },(e)=>{
//          res.status(400).send(e);
//      }); 
//  });


app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

// localhost:3000/todos/5e0b464cb994b28c4ceb2c2f :- when hit in postman we will get response in postman.
app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    var id=req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    }); 
});

// Hit the url from postman :- localhost:3000/todos/5e1c05f2313ec9c8609176f5 for DELETE.
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;   // 5e1c05f2313ec9c8609176f5

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});

// patch :- to update the todo items.test can be done when hitted from postman.
app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt=new Date().getTime();
    } else{
        body.completed=false;
        body.completedAt=null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});
// <<<<<<<<<<<<<<< Output :- 
// PS G:\KNW\KNW\KNW LANGUAGE\NODEJS\PRACTICE\7.1_MongoDB_API\node-todo-api> npm start
// then hit from the postman


//app.listen(3000,()=>{
app.listen(port,()=>{
    //console.log('Started on port 3000');
    console.log(`Started up at port ${port}`);
});

 module.exports={app};


//============================================================================================================

// // model with some properties with their type:- Robo mongo will make this Todo collection as todos.
// var Todo=mongoose.model('Todo',{
//    text:{
//     type:String,
//     required:true,
//     minlength:1,
//     trim:true 
//    } ,
//    completed:{
//     type:Boolean,
//     default:false
//    },
//    completedAt:{
//     type:Number,
//     default:null
//    }
// });

// //---------------- saving with one object :-
// var newTodo=new Todo({
//     text:'Cook dinner'
// });

// //this will write the data in mongodb.
// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to save todo');
// });


// //---------------- saving with more than one objects :-
// var otherTodo=new Todo({
//     text:'Feed the cat',
//     completed:true,
//     completedAt:123
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

// //---------------- saving with objects having require validator:-
// var otherTodo=new Todo({ 
//     text:' Edit this video '
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

//---------------- saving the user email with validators :-

// var User=mongoose.model('User',{
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:1
//     }
// });


// var user=new User({
//     email:'pravesh@example.com '
// });

// user.save().then((doc)=>{
//     console.log('User saved',doc);
// },(e)=>{
//     console.log('Unable to save user',e);
// });


















