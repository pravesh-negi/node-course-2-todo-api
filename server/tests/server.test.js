const expect=require('expect');
const request=require('supertest');
const{ObjectID}=require('mongodb');

const{app}=require('./../server'); // mapping with server.js file
const{Todo}=require('./../models/todo');


const todos=[{
    _id:new ObjectID(),
    text:'First test todo'
},{
    _id:new ObjectID(),
    text:'Second test todo'
}];


//beforeEach :- this will let us run some code before every single test case.
beforeEach((done)=>{
    // this is going to wipe all of our records.
    //Todo.remove({}).then(()=>done()); 
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done()); 
});


describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text='Test todo text';
        // requesting the data from server.js file and then getting the response
        request(app)
        .post('/todos')     // making post request to send data of text.
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text); //res.body.text will have the same result as of text because we are saing same data as we are getting.
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });



    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2); 
                done();
            }).catch((e)=>done(e));

        });
    });  
});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    }); 
});


describe('GET /todos/:id',()=>{
    // if id send from here match with the id of mongoDb.
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    // if id send from here does not match with the id of mongoDb.
    it('should return 404 if todonot found',(done)=>{
        var hexId=new ObjectID().toHexString();

        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    // send the hit to server.js from where 123abc will send invalid and send 404 response which is same expect here.
    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    }); 
});

//------------------- test cases for Delete :-


describe('DELETE /todos/:id',()=>{ 

    it('should remove a todo',(done)=>{
        var hexId=todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                // to check the hexId in Robo mongodb
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>done(e)); 
            });
    });

    
    it('should return 404 if todo not found',(done)=>{ 
        var hexId=new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    
    it('should return 404 if object id is invalid',(done)=>{ 
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    }); 
});
