/*
 *  lib/send/document.js
 *
 *  David Janes
 *  Consensas
 *  2017-02-25
 */

"use strict"

const _ = require("iotdb-helpers")

/**
 */
const document = _.promise.make(self => {
    _.promise.validate(self, document)

    self.response.set("Content-Type", self.document_media_type)
    self.response.send(self.document)
})

document.method = "send.document"
document.description = "Normal page response"
document.requires = {
    response: _.is.Object,
    document: [ _.is.String, _.is.Buffer ],
    document_media_type: _.is.String,
}
document.produces = {
}

/**
 *  API
 */
exports.document = document
