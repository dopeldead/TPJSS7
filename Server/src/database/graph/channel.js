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
var decorators_1 = require("../decorators");
var dbtypes_1 = require("../dbtypes");
var Channel = (function (_super) {
    __extends(Channel, _super);
    function Channel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Channel;
}(dbtypes_1.Vertex));
__decorate([
    decorators_1.Prop({
        indexed: true,
        mandatory: true
    }),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
Channel = __decorate([
    decorators_1.GraphItem("Channel")
], Channel);
exports.Channel = Channel;
var ChannelPostEdge = (function (_super) {
    __extends(ChannelPostEdge, _super);
    function ChannelPostEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChannelPostEdge;
}(dbtypes_1.Edge));
ChannelPostEdge = __decorate([
    decorators_1.GraphItem("CHANNEL_POST")
], ChannelPostEdge);
exports.ChannelPostEdge = ChannelPostEdge;
//# sourceMappingURL=channel.js.map