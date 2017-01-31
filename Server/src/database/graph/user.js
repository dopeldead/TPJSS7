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
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(dbtypes_1.Vertex));
__decorate([
    decorators_1.Prop({
        readonly: true,
        mandatory: true,
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    decorators_1.Prop({
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
        indexed: true
    }),
    __metadata("design:type", Boolean)
], User.prototype, "enabled", void 0);
__decorate([
    decorators_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "pictureUrl", void 0);
User = __decorate([
    decorators_1.GraphItem("User")
], User);
exports.User = User;
var UserPostEdge = (function (_super) {
    __extends(UserPostEdge, _super);
    function UserPostEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserPostEdge;
}(dbtypes_1.Edge));
UserPostEdge = __decorate([
    decorators_1.GraphItem("USER_POST")
], UserPostEdge);
exports.UserPostEdge = UserPostEdge;
var LikeEdge = (function (_super) {
    __extends(LikeEdge, _super);
    function LikeEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LikeEdge;
}(dbtypes_1.Edge));
LikeEdge = __decorate([
    decorators_1.GraphItem("LIKE")
], LikeEdge);
exports.LikeEdge = LikeEdge;
var UserCommentEdge = (function (_super) {
    __extends(UserCommentEdge, _super);
    function UserCommentEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserCommentEdge;
}(dbtypes_1.Edge));
UserCommentEdge = __decorate([
    decorators_1.GraphItem("USER_COMMENT")
], UserCommentEdge);
exports.UserCommentEdge = UserCommentEdge;
//# sourceMappingURL=user.js.map