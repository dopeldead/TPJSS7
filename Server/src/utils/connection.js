"use strict";
var neo4j = require("neo4j");
var Neo4jConnection = (function () {
    function Neo4jConnection() {
    }
    Neo4jConnection.getConnection = function (uri) {
        if (this.db) {
            return this.db;
        }
        return this.connect(uri);
    };
    Neo4jConnection.connect = function (uri) {
        return new neo4j.GraphDatabase(uri);
    };
    return Neo4jConnection;
}());
exports.Neo4jConnection = Neo4jConnection;
//# sourceMappingURL=connection.js.map