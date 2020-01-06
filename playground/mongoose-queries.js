const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose'); // this will make the connection with mongo db.
const{Todo}=require('./../server/models/todo');
const{User}=require('./../server/models/User');

var id='5e0b464cb994b28c4ceb2c2f';

// so ObjectID will compare the id with the structure present in database if not match then if condition will pass.
if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}

////-------- find in the todo database the data macthd with id.
// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

////------- find in the todo database the data macthd with id.
// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

////------- find in the todo database the data macthd with id having catch clause to catch the error.
Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo By Id',todo);
}).catch((e)=>console.log(e));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<< With User DataBase :-

User.findById('5e0b0dad6c003d604582bf3c').then((user)=>{
    if(!user){
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user,undefined,2));
},(e)=>{
    console.log(e);
});

