/*
 *  lib/send/headers.js
 *
 *  David Janes
 *  Consensas
 *  2019-08-02
 */

"use strict"

const _ = require("iotdb-helpers")

/**
 */
const headers = _.promise.make(self => {
    _.promise.validate(self, headers)

    _.mapObject(self.headers, (value, key) => {
        if (_.is.String(value)) {
            self.response.set(key, value)
        }
    })
})

headers.method = "send.headers"
headers.description = "Normal page response"
headers.requires = {
    response: _.is.Object,
    headers: _.is.Dictionary,
}
headers.produces = {
}

/**
 *  API
 */
exports.headers = headers
