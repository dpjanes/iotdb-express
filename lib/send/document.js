/*
 *  app/lib/document.js
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
 *  Accepts: self.response, self.json, self.document_media_type
 *  Produces: N/A
 *
 *  e.g. this is a normal page response
 */
const document = _.promise.make((self, done) => {
    const method = "send.document";

    assert.ok(self.response, `${method}: self.response is required`);
    assert.ok(self.document, `${method}: self.document is required`);
    assert.ok(_.is.String(self.document_media_type), `${method}: self.document_media_type is required to be a String`);

    self.response.set("Content-Type", self.document_media_type);
    self.response.send(self.document);

    done(null, self);
})

/**
 *  API
 */
exports.document = document;
