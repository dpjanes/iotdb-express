/*
 *  lib/router.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-01-05
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

const express = require("express")

/**
 */
const router = (path, processor) => _.promise((self, done) => {
    _.promise.validate(self, router)

    const xr = new express.Router()
    xr.__app = self.router.__app; // this makes sense, believe me
    xr.__self = self.router.__app.__self

    self.router.use(path, xr)
    self.router = xr

    _.promise(self)
        .then(processor)
        .end(done, self, router)
})

router.method = "router"
router.description = `Set up a route`
router.requires = {
    router: _.is.Object,
}
router.accepts = {
}
router.produces = {
    router: _.is.Object,
}

/**
 */
exports.router = router
