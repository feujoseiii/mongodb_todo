const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

});

describe('GET /todos', () => {

  it('should return all todos', (done) => {
    var text = "test case todo";
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        request(app)
          .get('/todos')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            Todo.find().then((todos) => {
              expect(todos.length).toBe(1);
              done();
            }).catch((e) => {
              done(e);
            });
          });
      });
  });

});


describe('GET /todos/todoID', () => {
  var invalidID = '596a1b6410881b1dd';
  var validID = '596a1b6410881b1ddca60d37';
  var dummyTodo = 'dummy todo task';

  it('should return 404 if todoID is not valid', (done) => {
    request(app)
      .get(`/todos/:${invalidID}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 404 if todo is not found', (done) => {
      request(app)
        .get(`/todos/:${validID}`)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
  });

  it('it should return todo if found', (done) => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          var curr_todoID = todos[0]._id;
          request(app)
            .get(`/todos/${curr_todoID}`)
            .expect(200)
            .expect((res) => {
              expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              done();
            });

        }).catch((err) => {
          done(err);
        });
      });
  });

});
