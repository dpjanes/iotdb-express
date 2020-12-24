/*
 *  lib/serve/all.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-18
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

const assert = require("assert")

/**
 *  Requires: self.router
 */
const serve = what => (path, ...rest) => _.promise(self => {
    const method = `serve.${what}`
        
    assert.ok(self.router, `${method}: expected self.router`)
    assert.ok(rest.length, `${method}: expected at least one argument after the path`)

    // this is the caller's promise to do the work
    const processor = rest.pop()

    // this is the express function we're calling
    const xf = self.router[what]

    // the first argument is the path, the rest the intermediate
    const xav = [
        path,
    ].concat(rest)

    // the last argument calls the processor
    const xprocessor = (request, response) => {
        assert.ok(self.router.__app)
        assert.ok(self.router.__app.__self)

        _.promise(self.router.__app.__self)
            .add({
                request: request,
                response: response,
                q: request.query,
                body: request.body,

                // a cache that lasts during the processing of this request
                _xcache: {
                    "@timestamp": _.timestamp.make(),
                },
            })
            .add(request.params || {})  // inject all the params
            .then(processor)
            .catch(error => {
                delete error.self
                console.log("UNEXPECTED ERROR", error)
            })
    }

    xav.push(xprocessor)

    // put it all together
    xf.apply(self.router, xav)
})

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
// exports.origin = serve("origin")
