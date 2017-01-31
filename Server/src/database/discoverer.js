"use strict";
var registry_1 = require("./registry");
var requiredir = require("requiredir");
var Discoverer = (function () {
    function Discoverer(_logger) {
        this._logger = _logger;
    }
    Discoverer.prototype.loadFile = function (path) {
        registry_1.ClassRegistry.initialize();
        this._logger.info("Load file : " + path);
        require(path);
        return registry_1.ClassRegistry.current;
    };
    Discoverer.prototype.loadDirectory = function (path) {
        registry_1.ClassRegistry.initialize();
        this._logger.info("Load directory : " + path);
        requiredir(path);
        return registry_1.ClassRegistry.current;
    };
    return Discoverer;
}());
exports.Discoverer = Discoverer;
//# sourceMappingURL=discoverer.js.map