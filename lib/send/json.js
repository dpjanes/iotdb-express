/*
 *  app/lib/json.js
 *
 *  David Janes
 *  Consensas
 *  2017-02-21
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const logger = require("../../logger")(__filename);

const IS_DEVELOPMENT = process.env.DAM_DEVELOPMENT === "1"

/**
 */
const json = _.promise.make((self, done) => {
    const method = "send.json";

    assert.ok(self.response, `${method}: self.response is required`);
    assert.ok(_.is.JSON(self.json), `${method}: self.json is required to be a JSON-friendly object`);

    if (IS_DEVELOPMENT) {
        self.response.header("Content-Type", "application/json");
        self.response.send(JSON.stringify(self.json, null, 2))
    } else {
        self.response.json(self.json);
    }

    done(null, self);
})

/**
 *  API
 */
exports.json = json;
