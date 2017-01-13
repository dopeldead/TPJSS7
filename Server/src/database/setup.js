"use strict";
var discoverer_1 = require("./discoverer");
var deployer_1 = require("./deployer");
var NeoGraphDb_1 = require("../services/impl/NeoGraphDb");
var channel_1 = require("./graph/channel");
var winston = require("winston");
var env_1 = require("../config/env");
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: "debug",
            handleExceptions: true
        }),
        new (winston.transports.File)({
            colorize: false,
            handleExceptions: true,
            json: true,
            filename: "./logs/activity.log"
        })
    ],
    exitOnError: false
});
var neo4j = require("neo4j");
var db = new neo4j.GraphDatabase(env_1.default.neo4j);
var graphService = new NeoGraphDb_1.NeoGraphDb(db);
var discoverer = new discoverer_1.Discoverer(logger);
var registry = discoverer.loadDirectory("./graph");
var deployer = new deployer_1.DbDeployer(registry, graphService, logger);
deployer
    .launch()
    .then(function (r) {
    var channel = new channel_1.Channel();
    channel.name = "Général";
    return graphService.createVertex(channel);
})
    .then(function (c) { return db.close(); });
//# sourceMappingURL=setup.js.map