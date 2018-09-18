/*
 *  app/lib/etag.js
 *
 *  David Janes
 *  Consensas
 *  2018-09-18
 */

"use strict"

const _ = require("iotdb-helpers")
const errors = require("iotdb-errors")

const assert = require("assert")

const logger = require("../../logger")(__filename)

/**
 *  Set and check an E-Tag
 */
const etag = _.promise.make(self => {
    const method = "send.etag"

    assert.ok(self.response, `${method}: self.response is required`);

    if (!self.etag) {
        return
    }

    self.response.set("ETag", self.etag)

    const if_none_match = self.request.get("If-None-Match")

    logger.debug({
        if_none_match: if_none_match,
        etag: self.etag,
    }, "etag")

    if (if_none_match && (if_none_match === self.etag)) {
        throw new errors.NotModified()
    }
})

/**
 *  API
 */
exports.etag = etag;
