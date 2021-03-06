/*
 *  lib/send/headers.js
 *
 *  David Janes
 *  IOTDB
 *  2019-08-02
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

/**
 */
const headers = _.promise(self => {
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
