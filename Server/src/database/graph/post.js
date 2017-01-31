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
var Post = (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Post;
}(dbtypes_1.Vertex));
__decorate([
    decorators_1.Prop({
        mandatory: true
    }),
    __metadata("design:type", String)
], Post.prototype, "message", void 0);
Post = __decorate([
    decorators_1.GraphItem("Post")
], Post);
exports.Post = Post;
var PostCommentEdge = (function (_super) {
    __extends(PostCommentEdge, _super);
    function PostCommentEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostCommentEdge;
}(dbtypes_1.Edge));
PostCommentEdge = __decorate([
    decorators_1.GraphItem("POST_COMMENT")
], PostCommentEdge);
exports.PostCommentEdge = PostCommentEdge;
//# sourceMappingURL=post.js.map