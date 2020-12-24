/*
 *  lib/send/error.js
 *
 *  David Janes
 *  IOTDB
 *  2017-02-25
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

const logger = require("../../logger")(__filename)

/**
 */
const error = self => error => {
    _.promise.validate(self, error)

    delete error.self

    if ((_.error.group(error) === 3) && error.url) {
        return self.response.redirect(error.url)
    } else if (_.error.group(error) === 5) {
        console.log("=========")
        console.log(error)
        console.log("=========")

        logger.error({
            method: error.method,
            error: error
        }, "web error - internal")
    } else {
        logger.info({
            method: error.method,
            error: error
        }, "web error")
    }

    self.response.status(_.error.code(error))
    self.response.header("Content-Type", "text/plain")
    self.response.send("error:" + _.error.message(error))
}

error.method = "send.error"
error.description = ``
error.requires = {
    response: _.is.Object,
}
error.accepts = {
}
error.produces = {
}

/**
 *  API
 */
exports.error = error
