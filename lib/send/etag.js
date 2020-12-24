/*
 *  lib/send/etag.js
 *
 *  David Janes
 *  IOTDB
 *  2018-09-18
 *
 *  Copyright (2013-2021) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")
const errors = require("iotdb-errors")

const logger = require("../../logger")(__filename)

/**
 */
const etag = _.promise(self => {
    _.promise.validate(self, etag)

    if (!self.etag) {
        return
    }

    self.response.set("ETag", self.etag)

    const if_none_match = self.request.get("If-None-Match")

    logger.debug({
        method: etag.method,
        if_none_match: if_none_match,
        etag: self.etag,
    }, "etag")

    if (if_none_match && (if_none_match === self.etag)) {
        throw new errors.NotModified()
    }
})

etag.method = "send.etag"
etag.description = `Set and check an E-Tag`
etag.requires = {
    response: _.is.Object,
    request: _.is.Object,
}
etag.accepts = {
    etag: _.is.String,
}
etag.produces = {
}

/**
 *  API
 */
exports.etag = etag
