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

describe("Activity tests", () => {
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

    describe("GET /getActivities success", () => {
        it('Should return all activities of user', (done) => {
            chai.request(app)
                .get('/activity/getActivities')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.map(element => element.user_id.should.be.equal(1))
                    done()
                })
        })
    })

    let testActivity = {
        name: 'mocha chai test activity',
        amount: 99.99,
        category_id: 1,
        type: 'expense',
        date: '2020-07-28'
    }

    let updateActivity = {
        id: null,
        updateData: {
            ...testActivity,
            name: 'updated name'
        }
    }

    describe("POST /addActivity success", () => {
        it('Should add new activity for user', (done) => {
            chai.request(app)
                .post('/activity/addActivity')
                .set('Authorization', `JWT ${testUser.token}`)  // set Authorization header
                .send(testActivity)
                .end((err, res) => {
                    res.should.have.status(200)
                    testActivity.addResponseID = res.body.id         // save id to later delete
                    updateActivity.id = res.body.id
                    done()
                })
        })
    })



    describe("PUT /updateActivity success", () => {
        it('Should update activity name', (done) => {
            chai.request(app)
                .put('/activity/updateActivity')
                .set('Authorization', `JWT ${testUser.token}`)  // set Authorization header
                .send(updateActivity)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.name.should.equal('updated name')
                    done()
                })
        })
    })

    describe("DELETE /deleteActivity success", () => {
        it('Should delete previously added category', (done) => {
            chai.request(app)
                .delete('/activity/deleteActivity')
                .set('Authorization', `JWT ${testUser.token}`)  // set Authorization header
                .send({ id: testActivity.addResponseID })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.delete.should.be.equal(true)
                    res.body.recordsDeleted.should.be.equal(1)
                    done()
                })
        })
    })


})
