"use strict";
var index_1 = require("./config/env/index");
var express_1 = require("./config/express");
var kernel_1 = require("./config/kernel");
var authentication_1 = require("./config/authentication");
var services_1 = require("./config/services");
var passport = require("passport");
var connection_1 = require("./utils/connection");
var inversify_express_utils_1 = require("inversify-express-utils");
var Socket = require("socket.io");
var services_2 = require("./services");
var debug = require("debug")("up-up:index");
connection_1.Neo4jConnection.connect(index_1.default.neo4j);
// configure services and DI
services_1.default(kernel_1.default, passport);
// configure OAuth bearer authentication
authentication_1.default(passport);
// start the server
var server = new inversify_express_utils_1.InversifyExpressServer(kernel_1.default);
server.setConfig(express_1.configureExpress);
server.setErrorConfig(express_1.configureErrors);
var app = server.build();
var httpServer = require("http").Server(app);
var io = Socket(httpServer);
services_2.setSocketServer(io);
// listen on port config.port
httpServer.listen(index_1.default.port, function () {
    console.log("server started on port " + index_1.default.port + " (" + index_1.default.env + ")");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map