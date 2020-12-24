/*
 *  lib/take_self.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-19
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
const take_self = _.promise(self => {
    _.promise.validate(self, take_self)

    self.app.__self = self
})

take_self.method = "take_self"
take_self.description = `This defines the "self" that will be used to serve web requests`
take_self.requires = {
    app: _.is.Object,
}
take_self.produces = {
    app: _.is.Object,
}

/**
 */
exports.take_self = take_self
