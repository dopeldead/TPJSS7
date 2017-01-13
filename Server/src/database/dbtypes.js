"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = require("./decorators");
var decorators_2 = require("./decorators");
var GraphItemBase = (function (_super) {
    __extends(GraphItemBase, _super);
    function GraphItemBase(idOrObj) {
        var _this = _super.call(this) || this;
        if (typeof idOrObj === "string") {
            _this.id = idOrObj;
        }
        else if (typeof idOrObj === "object") {
            var propsMeta = Reflect.getMetadata(decorators_2.PropertiesKey, _this.constructor);
            if (!propsMeta) {
                throw new Error("Cannot resolve metadata for graph item: " + _this.constructor);
            }
            for (var propName in idOrObj) {
                _this[propName] = idOrObj[propName];
            }
        }
        return _this;
    }
    return GraphItemBase;
}(Object));
exports.GraphItemBase = GraphItemBase;
var Vertex = (function (_super) {
    __extends(Vertex, _super);
    function Vertex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Vertex;
}(GraphItemBase));
__decorate([
    decorators_1.Prop({
        indexed: true,
        unique: true,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", String)
], Vertex.prototype, "id", void 0);
__decorate([
    decorators_1.Prop({
        indexed: true,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", Number)
], Vertex.prototype, "creationTime", void 0);
exports.Vertex = Vertex;
var Edge = (function (_super) {
    __extends(Edge, _super);
    function Edge(from, to) {
        var _this = _super.call(this) || this;
        _this.from = from;
        _this.to = to;
        return _this;
    }
    return Edge;
}(GraphItemBase));
__decorate([
    decorators_1.Prop({
        indexed: false,
        unique: false,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", String)
], Edge.prototype, "id", void 0);
__decorate([
    decorators_1.Prop({
        indexed: false,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", Number)
], Edge.prototype, "creationTime", void 0);
exports.Edge = Edge;
//# sourceMappingURL=dbtypes.js.map