import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';


const { expect } = chai;

chai.use(chaiHttp);
const mealURL = '/api/v1/meals';
const menuURL = '/api/v1/menu';
const orderURL = '/api/v1/orders';

describe('Test default route', () => {
  // Test for default route
  it('Should return 200 for the default route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  // Test for getting undefined routes
  it('Should return 404 for routes not specified', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  // Test for posting to undefined rouotes
  it('Undefined Routes Should Return 404', (done) => {
    chai.request(app)
      .post('/another/undefined/route')
      .send({ random: 'random' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test Meal Controller
describe('POST /api/v1/meal', () => {
  it('should not add meal with an empty category', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: '',
        name: 'Amala',
        price: 100
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not add meal with an empty name', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: 'Swallow',
        name: '',
        price: 500
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not add name with less than 3 characters', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: 'Swallow',
        name: 'Am',
        price: 500,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not add name with more than 15 characters', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: 'Swallow',
        name: 'Amalaandewedusoup',
        price: 500
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should not add meal with an empty price', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: 'Swallow',
        name: 'Amala',
        price: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.price)
          .to.include('price is required');
        done();
      });
  });
  it('should not add meal with price that is not a number', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        category: 'Swallow',
        name: 'Amala',
        price: 'price'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.price)
          .to.include('price must be a number');
        done();
      });
  });
  it('Should return 201 for a sucessful meal post', (done) => {
    chai.request(app)
      .post(`${mealURL}`)
      .send({
        id: 1,
        category: 'Swallow',
        name: 'Amala',
        price: '500'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully updated');
        expect(res.body).to.have.property('message').equal('meal added');
        expect(res.body).to.have.property('meal');
        done();
      });
  });
});

describe('Update Meal', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
      .send({
        id: 1,
        category: 'Swallow',
        name: 'Amala',
        price: '500'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully updated');
        expect(res.body).to.have.property('message').equal('meal updated');
        expect(res.body).to.have.property('meal');
        done();
      });
  });
  it('should not update a meal that does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/meals/10')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
describe('Get Meal', () => {
  it('should get all meals', (done) => {
    chai.request(app)
      .get(`${mealURL}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
  });
});
describe('Delete a meal', () => {
  it('should not delete a meal that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/10')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should delete a meal that the id exists', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully deleted');
        expect(res.body).to.have.property('message').equal('meal has been deleted');
        done();
      });
  });
});
// Test menu controller
describe('Add menu', () => {
  it('Should return 201 for a sucessful menu post', (done) => {
    chai.request(app)
      .post(`${menuURL}`)
      .send({
        date: '2018-4-29',
        mealIds: [1, 2, 3]
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully updated');
        expect(res.body).to.have.property('message').equal('menu added');
        done();
      });
  });
  it('Should return 400 for a menu post without date', (done) => {
    chai.request(app)
      .post(`${menuURL}`)
      .send({
        date: '',
        mealIds: [1, 2, 3]
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('date is required');
        done();
      });
  });
  it('Should return 400 for a menu post with date already existing', (done) => {
    chai.request(app)
      .post(`${menuURL}`)
      .send({
        date: '2018-4-25',
        mealIds: [1, 2, 3]
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('date is already existing');
        done();
      });
  });
});
describe('Get Menu', () => {
  it('should get menu for the day', (done) => {
    chai.request(app)
      .get(`${menuURL}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
  });
});
describe('Add order', () => {
  it('Should return 201 for a sucessful order post', (done) => {
    chai.request(app)
      .post(`${orderURL}`)
      .send({
        mealIds: [1, 3, 3]
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully updated');
        expect(res.body).to.have.property('message').equal('order added');
        done();
      });
  });
});
describe('Update Order', () => {
  it('Should return 200 if successful', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .send({
        mealIds: [1, 2, 3]
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('successfully updated');
        expect(res.body).to.have.property('message').equal('order updated');
        expect(res.body).to.have.property('order');
        done();
      });
  });
  it('should not update a order that does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/orders/10')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
describe('Get orders', () => {
  it('should get all orders', (done) => {
    chai.request(app)
      .get(`${orderURL}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
  });
});
