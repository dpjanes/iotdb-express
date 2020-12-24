/*
 *  lib/send/attachment.js
 *
 *  David Janes
 *  IOTDB
 *  2017-03-24
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
const attachment = _.promise(self => {
    _.promise.validate(self, attachment)

    self.response.setHeader("Content-disposition", "attachment; filename=" + self.document_name)
    if (self.document_media_type) {
        self.response.setHeader("Content-type", self.document_media_type)
    }
    self.response.send(self.document)
})

attachment.method = "send.attachment"
attachment.description = ``
attachment.requires = {
    response: _.is.Object,
    document: [ _.is.String, _.is.Buffer ],
    document_name: _.is.String,
}
attachment.accepts = {
    document_media_type: _.is.String,
}
attachment.produces = {
}

/**
 *  API
 */
exports.attachment = attachment
