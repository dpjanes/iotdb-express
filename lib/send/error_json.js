/*
 *  lib/send/error_json.js
 *
 *  David Janes
 *  IOTDB
 *  2016-03-12
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

let _last = null

/**
 */
const error_json = self => error => {
    _.promise.validate(self, error_json)

    delete error.self

    const signature = _.hash.md5(_.d.json(error))

    if (_.error.group(error) === 3) {
    } else if (_last === signature) {
        logger.error({
            method: error_json.method,
        }, "same error")
        // console.log("#", `${method}: error repeats`)
    } else if (_.error.group(error) === 5) {
        console.log("=========")
        console.log(error)
        console.log("=========")

        logger.error({
            method: error_json.method,
            error: error
        }, "web error - internal")
    } else {
        logger.info({
            method: error_json.method,
            error: error
        }, "web error")
    }

    _last = signature

    self.response
        .status(_.error.code(error))
        .json({ error: _.error.message(error) })
}

error_json.method = "send.error_json"
error_json.description = `Make a function that will respond to an error`
error_json.requires = {
    response: _.is.Object,
}
error_json.accepts = {
}
error_json.produces = {
}

/**
 *  API
 */
exports.error_json = error_json
