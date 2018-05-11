'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);
var mealURL = '/api/v1/meals';
var menuURL = '/api/v1/menu';
var orderURL = '/api/v1/orders';

describe('Test default route', function () {
  // Test for default route
  it('Should return 200 for the default route', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
  // Test for getting undefined routes
  it('Should return 404 for routes not specified', function (done) {
    _chai2.default.request(_app2.default).get('/another/undefined/route').end(function (err, res) {
      expect(res.status).to.equal(404);
      done();
    });
  });
  // Test for posting to undefined rouotes
  it('Undefined Routes Should Return 404', function (done) {
    _chai2.default.request(_app2.default).post('/another/undefined/route').send({ random: 'random' }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

// Test Meal Controller
describe('POST /api/v1/meal', function () {
  it('should not add meal with an empty category', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: '',
      name: 'Amala',
      price: 100
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should not add meal with an empty name', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: 'Swallow',
      name: '',
      price: 500
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should not add name with less than 3 characters', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: 'Swallow',
      name: 'Am',
      price: 500
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should not add name with more than 15 characters', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: 'Swallow',
      name: 'Amalaandewedusoup',
      price: 500
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should not add meal with an empty price', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: 'Swallow',
      name: 'Amala',
      price: ''
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.price).to.include('price is required');
      done();
    });
  });
  it('should not add meal with price that is not a number', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      category: 'Swallow',
      name: 'Amala',
      price: 'price'
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.price).to.include('price must be a number');
      done();
    });
  });
  it('Should return 201 for a sucessful meal added', function (done) {
    _chai2.default.request(_app2.default).post('' + mealURL).send({
      id: 1,
      category: 'Swallow',
      name: 'Amala',
      price: '500'
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('successfully updated');
      expect(res.body).to.have.property('message').equal('meal added');
      expect(res.body).to.have.property('meal');
      done();
    });
  });
});

describe('Update Meal', function () {
  it('Should return 200 if successful', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/meals/1').send({
      id: 1,
      category: 'Swallow',
      name: 'Amala',
      price: '500'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('Should return 409 if meal already exists', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/meals/1').send({
      id: 1,
      category: 'Swallow',
      name: 'Amala',
      price: '500'
    }).end(function (err, res) {
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('fail');
      expect(res.body).to.have.property('message').equal('meal name already exists, add another meal');
      done();
    });
  });
  it('should not update a meal that does not exist', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/meals/10').end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done();
    });
  });
});
describe('Get Meal', function () {
  it('should get all meals', function (done) {
    _chai2.default.request(_app2.default).get('' + mealURL).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('success');
      done();
    });
  });
});
describe('Delete a meal', function () {
  it('should not delete a meal that does not exist', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/meals/10').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('should delete a meal that the id exists', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/meals/1').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('successfully deleted');
      expect(res.body).to.have.property('message').equal('meal has been deleted');
      done();
    });
  });
});
// Test menu controller
describe('Add menu', function () {
  it('Should return 201 for a sucessful menu post', function (done) {
    _chai2.default.request(_app2.default).post('' + menuURL).send({
      mealIds: [1, 2, 3]
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('successfully added menu');
      expect(res.body).to.have.property('message').equal('menu added');
      done();
    });
  });
  it('Should return 409 for a menu post with date already existing', function (done) {
    _chai2.default.request(_app2.default).post('' + menuURL).send({
      date: '2018-4-25',
      mealIds: [1, 2, 3]
    }).end(function (err, res) {
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('date is already existing');
      done();
    });
  });
});
describe('Get Menu', function () {
  it('should get menu for the day', function (done) {
    _chai2.default.request(_app2.default).get('' + menuURL).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('success');
      done();
    });
  });
});
describe('Add order', function () {
  it('Should return 201 for a sucessful order post', function (done) {
    _chai2.default.request(_app2.default).post('' + orderURL).send({
      mealIds: [1, 3, 3]
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('successfully updated');
      expect(res.body).to.have.property('message').equal('order added');
      done();
    });
  });
});
describe('Get orders', function () {
  it('should get all orders', function (done) {
    _chai2.default.request(_app2.default).get('' + orderURL).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
});
describe('Update Order', function () {
  it('Should return 200 if successful', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/orders/1').send({
      mealIds: [1, 2, 3]
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status').equal('successfully updated');
      expect(res.body).to.have.property('message').equal('order updated');
      expect(res.body).to.have.property('meals');
      done();
    });
  });
  it('should not update a order that does not exist', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/orders/10').send({
      mealIds: [1, 2, 3]
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
});