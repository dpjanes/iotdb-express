/*
 *  lib/listen/http.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-18
 *
 *  Copyright [2013-2018] [David P. Janes]
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

"use strict";

const _ = require("iotdb-helpers")

const http = require("http");
const assert = require("assert");

/**
 *  Requires: self.httpd, self.app
 *  Accepts: self.servers
 *  Produces: self.servers
 */
const serve_http = _.promise.make((self, done) => {
    const method = "listen.http";

    assert.ok(self.httpd, `${method}: expected self.httpd`)
    assert.ok(self.app, `${method}: expected self.app`)

    _.promise.make(self)
        .then(_.promise.add("servers", _.promise.clone(self.servers || {})))
        .then(_.promise.make((sd, inner_done) => {
            const server = http
                .createServer(self.app)
                .listen(self.httpd.port || 0, self.httpd.host || "0.0.0.0", () => {
                    const address = server.address();
                    const key = `${address.address}:${address.port}`
                    const url = address.port === 80 ? `http://${address.address}` : `http://${address.address}:${address.port}`;

                    sd.servers[key] = {
                        address: _.promise.clone(address),
                        url: url,
                        server: server,
                    }

                    inner_done(null, sd)
                    inner_done = _.noop;
                })

            server.on("error", error => {
                inner_done(error)
                inner_done = _.noop;
            })
        }))
        .then(_.promise.done(done, self, "servers"))
        .catch(done)
});

/**
 *  API
 */
exports.http = serve_http;
