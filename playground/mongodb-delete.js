//const MongoClient=require('mongodb').MongoClient; 
 
const {MongoClient,ObjectID}=require('mongodb') // creating a variable called Mongo client like we do here setting it equal to the Mongoclient property of require MongoDB. it's equvalent to :- const MongoClient=require('mongodb').MongoClient;
   

// TodoApp(database) :- you dont need to create the database in mongodb unlike the other database.
// i.e :-mongodb://localhost:27017/pravesh :- with this database with name pravesh will be created.

// mMongo will not create the database until we start adding data into it
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');  

    // //<<<<<<<<< deleteMany :-
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // //<<<<<<<<< deleteOne :- it delete the first item it sees that matches the criteria and then it stops.
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // //<<<<<<<<< findOneAndDelete :- search first and will delete it.
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // }); 

    //<<<<<<<<< Challenge :-
    //db.collection('Users').deleteMany({name:'Pravesh'});

    db.collection('Users').findOneAndDelete({
        _id:new ObjectID("5e09bbcc44ad8730601d0e2e")
    }).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));
    });
 

    // // now disconnect to the server
    // //db.close();
});