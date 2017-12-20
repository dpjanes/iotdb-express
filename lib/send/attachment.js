/*
 *  app/lib/attachment.js
 *
 *  David Janes
 *  Consensas
 *  2017-03-24
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const logger = require("../../logger")(__filename);

/**
 *  Accepts: self.response, self.document, self.document_name
 *  Produces: N/A
 */
const attachment = _.promise.make((self, done) => {
    const method = "send.attachment";

    assert.ok(self.response, `${method}: self.response is required`);
    assert.ok(_.is.String(self.document) || _.is.Buffer(self.document), 
        `${method}: self.document must be a String or Buffer`);
    assert.ok(_.is.String(self.document_name), 
        `${method}: self.document_name must be a String`);

    self.response.setHeader("Content-disposition", "attachment; filename=" + self.document_name);
    if (self.document_media_type) {
        self.response.setHeader("Content-type", self.document_media_type);
    }
    self.response.send(self.document)

    done(null, self);
})

/**
 *  API
 */
exports.attachment = attachment;
