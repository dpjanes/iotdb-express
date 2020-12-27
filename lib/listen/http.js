/*
 *  lib/listen/http.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-18
 *
 *  Copyright (2013-2021) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License")
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

const http = require("http")

/**
 */
const serve_http = _.promise((self, done) => {
    _.promise(self)
        .validate(serve_http)

        .make((sd, sdone) => {
            sd.servers = _.d.clone(sd.servers || {})

            const server = http
                .createServer(sd.app)
                .listen(sd.http$cfg.port || 0, sd.http$cfg.host || "0.0.0.0", () => {
                    const address = server.address()
                    const key = `${address.address}:${address.port}`
                    const url = address.port === 80 ? `http://${address.address}` : `http://${address.address}:${address.port}`

                    sd.server = sd.servers[key] = {
                        address: _.promise.clone(address),
                        url: url,
                        server: server,
                    }

                    sdone(null, sd)
                    sdone = _.noop
                })

            server.on("error", error => {
                sdone(error)
                sdone = _.noop
            })
        })
        .end(done, self, serve_http)
})

serve_http.method = "list.http"
serve_http.description = ``
serve_http.requires = {
    http$cfg: _.is.Dictionary,
    app: _.is.Object,
}
serve_http.accepts = {
    servers: _.is.Dictionary,
    http$cfg: {
        host: _.is.String,
        port: _.is.Integer,
    },
}
serve_http.produces = {
    servers: _.is.Dictionary,
    server: _.is.Dictionary,
}

/**
 *  Parameterized
 */
const serve_http_p = (host, port) => _.promise((self, done) => {
    _.promise(self)
        .add("http$cfg", {
            host: host,
            port: port,
        })
        .then(serve_http)
        .end(done, self, serve_http)
})

/**
 *  API
 */
exports.http = serve_http
exports.http.p = serve_http_p
