/**
 * Main application routes
 */

'use strict';

let Cache = require('./Cache');
let cacheInstance = new Cache();
module.exports = function(app) {
    // Post/input
    app.post('/input', (req, res) => {
        console.log(req.body);
        cacheInstance.input(req.body.input, (err, response) => {
            if (err) {
                res.status(422).json(err);
            } else {
                res.status(200).json({ "response": req.body.input });
            }
        });
    });
    //Get/output
    app.get('/output', (req, res) => {
        cacheInstance.output((response) => {
            console.log(response);
            res.status(200).json({ result: response });
            return res;
        });
    });
    //Clear current Rredis datalist
    app.use('/clear', (req, res) => {
        console.log("starting clear");
        cacheInstance.clearCache((err, response) => {
            if (err) {
                res.status(422).json(err);
            } else {
                res.status(200).json({ result: response });
            }
        });
    });
    // All undefined asset or api routes should return a 404
    app.route('/*')
        .get((req, res) => {
            let result = {
                status: 404
            };
            res.sendStatus(result.status);
        });
};
