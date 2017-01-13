"use strict";
var decorators_1 = require("./decorators");
var DbDeployer = (function () {
    function DbDeployer(registry, _db, _logger) {
        this.registry = registry;
        this._db = _db;
        this._logger = _logger;
    }
    DbDeployer.prototype.createUniqueConstraint = function (vertice, property) {
        var _this = this;
        this._logger.info("create unique contraint for " + vertice + " on " + property);
        var query = "CREATE CONSTRAINT ON (v:" + vertice + ") ASSERT v." + property + " IS UNIQUE";
        return this._db.query(query).then(function (r) {
            _this._logger.info("unique contraint for " + vertice + " on " + property + " created successfully");
            return r;
        }, function (e) {
            _this._logger.error("dbsetup error: ", e);
            return e;
        });
    };
    DbDeployer.prototype.createIndex = function (vertice, property) {
        var _this = this;
        this._logger.info("create index for " + vertice + " on " + property);
        var query = "CREATE INDEX ON :" + vertice + "(" + property + ")";
        return this._db.query(query).then(function (r) {
            _this._logger.info("index for " + vertice + " on " + property + " created successfully");
            return r;
        }, function (e) {
            _this._logger.error("dbsetup error: ", e);
            return e;
        });
    };
    DbDeployer.prototype.launch = function () {
        var _this = this;
        this._logger.info("Start dbsetup");
        var classes = this.registry.getClasses();
        var asyncFunc = [];
        var _loop_1 = function (name_1) {
            var propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, classes[name_1]);
            if (propsMeta) {
                propsMeta.uniques.forEach(function (prop) { return asyncFunc.push(function () { return _this.createUniqueConstraint(name_1, prop); }); });
                propsMeta.indexes.forEach(function (prop) { return asyncFunc.push(function () { return _this.createIndex(name_1, prop); }); });
            }
        };
        for (var name_1 in classes) {
            _loop_1(name_1);
        }
        var all = asyncFunc.reduce(function (prevFunc, current) {
            return function () {
                return prevFunc().then(function (r) { return current(); });
            };
        }, function () { return Promise.resolve(true); });
        return all().then(function (r) {
            _this._logger.info("End dbsetup");
            return r;
        }, function (e) {
            _this._logger.error("dbsetup error: ", e);
            return e;
        });
    };
    return DbDeployer;
}());
exports.DbDeployer = DbDeployer;
//# sourceMappingURL=deployer.js.map