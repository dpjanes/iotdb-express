/*
 *  app/lib/error_json.js
 *
 *  David Janes
 *  Consensas
 *  2016-03-12
 */

"use strict"

const _ = require("iotdb-helpers")

const assert = require("assert")

const logger = require("../../logger")(__filename)

let _last = null

/**
 *  Make a function that will respond to an error
 */
const error_json = self => error => {
    const method = "send.error_json";

    delete error.self;

    assert.ok(self, `${method}: expected self`);
    assert.ok(self.response, `${method}: expected self.response`);

    // logger.error({ error: error }, "API error");

    const signature = _.hash.md5(_.d.json(error))

    if (_last === signature) {
        logger.error({
            method: method,
        }, "same error")
        // console.log("#", `${method}: error repeats`)
    } else if (_.error.group(error) === 5) {
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

    _last = signature

    self.response
        .status(_.error.code(error))
        .json({ error: _.error.message(error) });
};

/**
 *  API
 */
exports.error_json = error_json;
