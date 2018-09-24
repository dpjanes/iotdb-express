/*
 *  app/lib/error_json.js
 *
 *  David Janes
 *  Consensas
 *  2016-03-12
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const logger = require("../../logger")(__filename);

/**
 *  Make a function that will respond to an error
 */
const error_json = self => error => {
    const method = "send.error_json";

    delete error.self;

    assert.ok(self, `${method}: expected error.self`);
    assert.ok(self.response, `${method}: expected error.self.response`);

    // logger.error({ error: error }, "API error");

    if (_.error.group(error) === 5) {
        console.log("=========");
        console.log(error);
        console.log("=========");

        logger.error({
            method: method,
            error: error
        }, "web error - internal");
    } else if (_.error.group(error) === 3) {
    } else {
        logger.info({
            method: method,
            error: error
        }, "web error");
    }

    self.response
        .status(_.error.code(error))
        .json({ error: _.error.message(error) });
};

/**
 *  API
 */
exports.error_json = error_json;
