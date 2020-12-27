/*
 *  lib/stop.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-20
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
const stop = _.promise(self => {
    _.promise.validate(self, stop)

    if (self.servers) {
        _.values(self.servers).forEach(server => {
            server.server.close()
        })
    }

    delete self.app
    delete self.servers
})

stop.method = "stop"
stop.description = `
    This will shutdown all the servers. Note that
    this doesn't wait for the sockets to go down,
    maybe this could be revisted
    `
stop.requires = {
}
stop.accepts = {
    app: _.is.Object,
    servers: _.is.Dictionary,
}
stop.produces = {
}

/**
 */
exports.stop = stop
