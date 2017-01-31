"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var connection_1 = require("../../utils/connection");
var decorators_1 = require("../../database/decorators");
require("reflect-metadata");
var inversify_1 = require("inversify");
var uuid = require("uuid");
var NeoGraphDb = NeoGraphDb_1 = (function () {
    function NeoGraphDb(uri, cypher) {
        this.cypher = cypher;
        this._db = connection_1.Neo4jConnection.getConnection(uri);
        if (!this.cypher) {
            this.cypher = this._db.cypher.bind(this._db);
        }
    }
    NeoGraphDb.prototype.createVertex = function (vertice) {
        var classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, vertice.constructor);
        var propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, vertice.constructor);
        vertice.id = uuid.v4().toString();
        vertice.creationTime = new Date().getTime();
        var dbVertex = {};
        for (var key in propsMeta.properties) {
            var pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && (vertice[key] === undefined || vertice[key] === null)) {
                throw new Error("Property " + key + " of vertice " + classMeta.name + " is required");
            }
            if (vertice[key] !== undefined) {
                dbVertex[key] = vertice[key];
            }
        }
        var dbVertexQuery = "(:" + classMeta.name + " " + this.serializeGraphProperty(dbVertex) + ")";
        return this.query("create " + dbVertexQuery, dbVertex)
            .then(function (r) { return vertice; })
            .catch(function (e) {
            throw e;
        });
    };
    NeoGraphDb.prototype.updateVertex = function (vertice) {
        var classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, vertice.constructor);
        var propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, vertice.constructor);
        var query = "match (v:" + classMeta.name + " {id: '" + vertice.id + "'}) set ";
        var builder = [];
        for (var propName in propsMeta.properties) {
            if ((vertice[propName] === undefined || vertice[propName] === null) && propsMeta.properties[propName].mandatory) {
                throw new Error("Property " + propName + " of vertice " + classMeta.name + " is required");
            }
            if (!propsMeta.properties[propName].readonly && vertice[propName] !== undefined) {
                builder.push("v." + propName + " = {" + propName + "}");
                builder.push(", ");
            }
        }
        builder.pop();
        query += builder.join("");
        return this.query(query, vertice).then(function (r) { return vertice; })
            .catch(function (e) {
            throw e;
        });
    };
    NeoGraphDb.prototype.serializeGraphProperty = function (obj) {
        var builder = ["{"];
        for (var key in obj) {
            if (obj[key] !== undefined && typeof obj[key] !== "object" && typeof obj[key] !== "function") {
                builder.push(key + ": {" + key + "}");
                builder.push(",");
            }
        }
        builder.pop(); // the last ,
        builder.push("}");
        return builder.join("");
    };
    NeoGraphDb.prototype.deleteEdge = function (edge) {
        var classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.constructor);
        return this.query("match ()-[e:" + classMeta.name + " {id: {id}}]-() delete e", { id: edge.id });
    };
    NeoGraphDb.prototype.createEdge = function (edge) {
        var fromClassMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.from.constructor);
        var toClassMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.to.constructor);
        var classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.constructor);
        var propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, edge.constructor);
        edge.id = uuid.v4().toString();
        edge.creationTime = new Date().getTime();
        var dbVertex = {};
        for (var key in propsMeta.properties) {
            var pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && edge[key] === undefined || edge[key] === null) {
                throw new Error("Property " + key + " of vertice " + classMeta.name + " is required");
            }
            if (edge[key] !== undefined) {
                dbVertex[key] = edge[key];
            }
        }
        var dbEdgeQuery = "[:" + classMeta.name + " " + this.serializeGraphProperty(dbVertex) + "]";
        var query = "\n            match (from:" + fromClassMeta.name + " {id: '" + edge.from.id + "'})\n            match (to:" + toClassMeta.name + " {id: '" + edge.to.id + "'})\n            create (from)-" + dbEdgeQuery + "->(to)";
        return this.query(query, dbVertex)
            .then(function (r) { return edge; })
            .catch(function (e) {
            throw e;
        });
    };
    NeoGraphDb.prototype.query = function (query, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.cypher({
                    query: query,
                    params: params,
                    lean: true
                }, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    NeoGraphDb.prototype.first = function (query, params) {
        return this.query(query, params).then(function (r) { return r[0]; });
    };
    NeoGraphDb.prototype.transaction = function (scope) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tx = _this._db.beginTransaction();
            var db = new NeoGraphDb_1(_this._db, tx.cypher.bind(tx));
            var commit = function (result) {
                try {
                    tx.commit(function () { return resolve(result); });
                }
                catch (e) {
                    reject(e);
                }
            };
            var rollback = function (reason) {
                try {
                    tx.rollback(function () { return reject(new Error(reason)); });
                }
                catch (e) {
                    reject(e);
                }
            };
            try {
                var res = scope(db, commit, rollback);
                if (res && typeof res.then === "function") {
                    res.then(function (val) {
                        commit(val);
                    }, function (e) {
                        rollback(e);
                    });
                }
            }
            catch (e) {
                rollback(e);
            }
        });
    };
    return NeoGraphDb;
}());
NeoGraphDb = NeoGraphDb_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, Object])
], NeoGraphDb);
exports.NeoGraphDb = NeoGraphDb;
var NeoGraphDb_1;
//# sourceMappingURL=NeoGraphDb.js.map