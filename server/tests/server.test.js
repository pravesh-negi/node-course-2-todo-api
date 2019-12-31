const expect=require('expect');
const request=require('supertest');

const{app}=require('./../server'); // mapping with server.js file
const{Todo}=require('./../models/todo');


const todos=[{
    text:'First test todo'
},{
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
