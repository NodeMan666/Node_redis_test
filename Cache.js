'use strict';

var redis = require("redis"),
    config = require("./config/config.json"),
    client = redis.createClient();

class Cache {
    constructor() {
        this.client = redis.createClient();
        this.client.select(config.redis.db, () => {
            return this.client.on("error", function(err) {
                console.log("Error " + err);
            });
        });
    }

    input(val_input, callback) {
        if (!this.isValidInteger(val_input)) {
            callback("Input is not a valid integer");
            return;
        }
        this.client.rpush(['numbers', val_input], (err, reply) => {
            //return console.log(reply);
            return callback(err, reply);
        });
    }

    output(callback) {
        let tmp = 0,
            result = [];
        this.client.lrange('numbers', 0, -1, (err, reply) => {
            console.log(reply);
            reply.map((item, index) => {
                if (index == 0) {
                    result.push(parseInt(item));
                    tmp = item;
                } else {
                    result.push((parseInt(item) + parseInt(tmp)) / 2);
                    tmp = item;
                }

            });
            return callback(result);
        });
    }

    clearCache(callback) {
        this.client.del('numbers', function(err, reply) {
            console.log(reply);
            return callback(err, reply);
        });
    }

    isValidInteger(val_input) {
        let var_num = parseFloat(val_input);
        if (!Number.isInteger(var_num) || var_num.toString() != val_input) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Cache;
