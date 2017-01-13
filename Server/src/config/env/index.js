"use strict";
var path = require("path");
var _ = require("lodash");
var env = process.env.NODE_ENV || "development";
var config = require("./" + env).default;
var defaults = {
    root: path.join(__dirname, "/..")
};
_.assign(config, defaults);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=index.js.map