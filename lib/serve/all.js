/*
 *  lib/serve/all.js
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

const assert = require("assert");

/**
 *  Requires: self.app
 */
const serve = what => (path, call) => _.promise.make((self, done) => {
    const method = `serve.${what}`;
        
    assert.ok(self.app, `${method}: expected self.app`);

    self.app[what](self.rule.key, (request, response) => {
        _.promise.make(self)
            .then(_.promise.add({
                request: request,
                response: response,
            }))
            .then(call)
            .catch(error => {
                delete error.self;
                console.log("UNEXPECTED ERROR", error);
            })
    })

    done(null, self);
});

/**
 *  API
 */
exports.all = serve("all")
exports.get = serve("get")
exports.put = serve("put")
exports.patch = serve("patch")
exports.post = serve("post")
exports.delete = serve("delete")
exports.head = serve("head")
