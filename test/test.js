'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let fs = require('fs');
//let test_data = JSON.parse(JSON.stringify(fs.readFileSync('./test/data.json', 'utf8')));
let test_data = require('./data.json');
chai.use(chaiHttp);
describe('Digital filter', () => {
    // POST /input
    it('should post values in a loop', (done) => {
        test_data.input.forEach((value, index) => {
            chai.request(server)
                .post('/input')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ input: value })
                .end((err, res) => {
                    if (err) {
                        res.should.have.status(422);
                    } else {
                        res.should.have.status(200);
                    }
                    res.should.be.json;
                    //console.log(res.body.count);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response');
                });
        });
        done();
    });

    // GET /output
    it('should return moving average of stored values', (done) => {
        chai.request(server)
            .get('/output')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.property('result');
                res.body.result.should.equal(test_data.output);
            });
        done();
    });

});
