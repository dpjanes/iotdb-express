/*
 *  app/lib/error.js
 *
 *  David Janes
 *  Consensas
 *  2017-02-25
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const logger = require("../../logger")(__filename);

/**
 */
const error = self => error => {
    const method = "send.error";
    console.lo

    delete error.self;

    assert.ok(self.response, `${method}: expected error.self.response`);

    if (_.error.group(error) === 5) {
        console.log("=========");
        console.log(error);
        console.log("=========");

        logger.error({
            method: method,
            error: error
        }, "web error - internal");
    } else {
        logger.info({
            method: method,
            error: error
        }, "web error");
    }

    self.response.status(_.error.code(error))
    self.response.header("Content-Type", "text/plain")
    self.response.send("error:" + _.error.message(error))
}

/**
 *  API
 */
exports.error = error;
