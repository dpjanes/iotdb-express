/*
 *  app/lib/attachment_json.js
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
 *  Accepts: self.response, self.json, self.document_name
 *  Produces: N/A
 */
const attachment_json = _.promise.make((self, done) => {
    const method = "send.attachment_json";

    assert.ok(self.response, `${method}: self.response is required`);
    assert.ok(_.is.JSON(self.json), `${method}: self.json must be a JSON`);
    assert.ok(_.is.String(self.document_name), `${method}: self.document_name must be a String`);

    self.response.setHeader("Content-disposition", "attachment; filename=" + self.document_name);
    self.response.setHeader("Content-type", "application/json")
    self.response.send(JSON.stringify(self.json, null, 2));

    done(null, self);
})

/**
 *  API
 */
exports.attachment_json = attachment_json;
