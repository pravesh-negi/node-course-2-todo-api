//const MongoClient=require('mongodb').MongoClient;

// var user={name:'Pravesh' , age:25};
// var {name}=user;    // In ES6:- we have restructure the user object pulling off the name property creating a new name variable and setting it equal to whatever the value is.
// console.log(name);

const {MongoClient,ObjectID}=require('mongodb') // creating a variable called Mongo client like we do here setting it equal to the Mongoclient property of require MongoDB. it's equvalent to :- const MongoClient=require('mongodb').MongoClient;
 
// var obj=new ObjectID();
// console.log(obj);

//------------------------------

// TodoApp(database) :- you dont need to create the database in mongodb unlike the other database.
// i.e :-mongodb://localhost:27017/pravesh :- with this database with name pravesh will be created.

// mMongo will not create the database until we start adding data into it
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server'); 
    //const db=client.db('TodoApp');

    //  // insertOne:- insert a new document into your collection.
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false 
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });  

    // //----------------------------------------------------------
    //  db.collection('Users').insertOne({ 
    //     name:'Pravesh',
    //     age:25,
    //     location:'Gurgaon' 
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert user',err);
    //     }

    //     //console.log(result.ops); // result.ops :- array of all the documents that got inserted 
    //     //console.log(result.ops[0]._id); // result.ops :- array of all the documents that got inserted 
    //     console.log(result.ops[0]._id.getTimestamp()); // result.ops :- array of all the documents that got inserted 
    // });  

    // now disconnect to the server
    db.close();
});