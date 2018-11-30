/*
 *  lib/serve/redirect.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-11-30
 *
 *  Copyright 2013-2019 David P. Janes
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

/**
 *  This will redirect the user to the page
 */
const redirect = uri => _.promise.make(self => {
    self.response.redirect(uri)
})

/**
 *  API
 */
exports.redirect = redirect
exports.redirect.home = redirect("/")
