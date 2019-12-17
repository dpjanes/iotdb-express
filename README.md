# iotdb-express
POP functions for dealing with Express

## Samples


    "use strict"

    const _ = require("iotdb-helpers")
    const express = require("iotdb-express")

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
    _page_home.produces = {
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
