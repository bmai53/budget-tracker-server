const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const { expect } = require('chai')

// Chai configs
chai.use(chaiHttp)
chai.should()

const testUser = {
    email: 'test@test.com',
    password: '123456'
}

describe("Category tests", () => {
    describe("POST /login success", () => {
        it('Should return successful login', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.auth.should.be.equal(true)

                    testUser.token = res.body.token

                    done()
                })
        })
    })

    describe("GET /getCategories success", () => {
        it('Should return all categories of user', (done) => {
            chai.request(app)
                .get('/category/getCategories')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.map(element => element.user_id.should.be.equal(1))
                    done()
                })
        })
    })

    const testCategory ={
        name: 'mocha chai test category'
    }

    describe("POST /addCategory success", () => {
        it('Should add new category for user', (done) => {
            chai.request(app)
                .post('/category/addCategory')
                .set('Authorization', `JWT ${testUser.token}`)  // set Authorization header
                .send(testCategory)
                .end((err, res) => {
                    res.should.have.status(200)
                    testCategory.addResponse = res.body         // save id to later delete
                    done()
                })
        })
    })

    describe("POST /deleteCategory success", () => {
        it('Should delete previously added category', (done) => {
            chai.request(app)
                .delete('/category/deleteCategory')
                .set('Authorization', `JWT ${testUser.token}`)  // set Authorization header
                .send({ id: testCategory.addResponse.id})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.delete.should.be.equal(true)
                    res.body.recordsDeleted.should.be.equal(1)
                    done()
                })
        })
    })


})
