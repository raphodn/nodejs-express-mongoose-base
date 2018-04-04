process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/user');

chai.use(chaiHttp);
const should = chai.should();

const app = require('../../app');

const newUser = {
  username: 'test',
  email: 'test@email.com'
};


describe('Users routes tests', () => {
  beforeEach((done) => {
    User.remove({})
      .then(_ => done());
  });

  describe('GET /users', () => {
    it('it should GET all the users (0)', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should GET all the users (1)', (done) => {
      User.create(newUser)
        .then((user) => {
          chai.request(app)
            .get('/api/users')
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              res.body[0].should.have.property('_id').eql(user.id);
              res.body[0].should.have.property('username').eql(user.username);
              done();
            });
        });
    });
  });

  describe('GET /users/:user_id', () => {
    it('it should GET a user by the given id', (done) => {
      User.create(newUser)
        .then((user) => {
          chai.request(app)
            .get(`/api/users/${user.id}`)
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id').eql(user.id);
              res.body.should.have.property('username').eql(user.username);
              done();
            });
        });
    });

    it('it should return a 404 if the user does not exist', (done) => {
      chai.request(app)
        .get(`/api/users/${mongoose.Types.ObjectId()}`)
        .end((err, res) => {
          res.status.should.eql(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('it should create a new user', (done) => {
      chai.request(app)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.status.should.eql(201);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql(newUser.username);
          done();
        });
    });
  });

  // TODO
  // describe('PUT /users/:user_id', () => {
  // });

  // TODO
  // describe('DELETE /users/:user_id', () => {
  // });

  after((done) => {
    mongoose.disconnect();
    done();
  });
});
