 
 var express=require('express');
 var bodyParser=require('body-parser'); //this is going to let us send json to the server.the server can take that json and do 
                                        //something with it.it take the string body and turns it into a javascript object.							

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();
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

app.listen(3000,()=>{
    console.log('Started on port 3000');
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


















