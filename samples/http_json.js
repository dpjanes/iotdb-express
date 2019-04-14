/*
 *  samples/http_json.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-04-14
 *
 *  Copyright (2013-2019) David Janes
 */

"use strict"

const _ = require("iotdb-helpers")
const express = require("..")

/**
 */
const _page_home = _.promise(self => {
    _.promise(self)
        .validate(_page_home)

        .add("json", {
            "@type": "schema:Thing",
            "schema:name": "Hello, World",
        })
        .then(express.send.json)
        .catch(express.send.error_json(self))
})

_page_home.method = "_page_home"
_page_home.requires = {
    app: _.is.Object,
    request: _.is.Object,
    response: _.is.Object,
}

_.promise()
    .then(express.initialize)
    .then(express.take_self)
    .then(express.serve.get("/", _page_home))
    .then(express.listen.http.p("0.0.0.0", 4000))

    .catch(error => {
        delete error.self
        console.log("#", error)
    })
