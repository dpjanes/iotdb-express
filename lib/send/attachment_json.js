/*
 *  lib/send/attachment_json.js
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

/**
 */
const attachment_json = _.promise(self => {
    _.promise.validate(self, attachment_json)

    self.response.setHeader("Content-disposition", "attachment; filename=" + self.document_name)
    self.response.setHeader("Content-type", "application/json")
    self.response.send(JSON.stringify(self.json, null, 2))
})

attachment_json.method = "send.attachment_json"
attachment_json.description = ``
attachment_json.requires = {
    response: _.is.Object,
    json: _.is.JSON,
    document_name: _.is.String,
}
attachment_json.accepts = {
}
attachment_json.produces = {
}

/**
 *  API
 */
exports.attachment_json = attachment_json
