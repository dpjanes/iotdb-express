/*
 *  lib/send/json.js
 *
 *  David Janes
 *  IOTDB
 *  2017-02-21
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

const IS_DEVELOPMENT = process.env.DAM_DEVELOPMENT === "1"

/**
 */
const json = _.promise(self => {
    _.promise.validate(self, json)

    if (IS_DEVELOPMENT) {
        self.response.header("Content-Type", "application/json")
        self.response.send(JSON.stringify(self.json, null, 2))
    } else {
        self.response.json(self.json)
    }
})

json.method = "send.json"
json.description = ``
json.requires = {
    response: _.is.Object,
    json: _.is.JSON,
}
json.accepts = {
}
json.produces = {
}

/**
 *  API
 */
exports.json = json
