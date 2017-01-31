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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inversify_1 = require("inversify");
var constants_1 = require("../constants");
var graph_1 = require("../database/graph");
var index_1 = require("./index");
var _ = require("lodash");
var ChannelService = (function () {
    function ChannelService(db, userStore, socketService) {
        this.db = db;
        this.userStore = userStore;
        this.socketService = socketService;
    }
    ChannelService.prototype.create = function (newChannel) {
        var _this = this;
        var channel = new graph_1.Channel();
        channel.name = newChannel.name;
        return this.db.createVertex(channel).then(function (c) {
            _this.socketService.emit("channel:add", channel);
            return c;
        });
    };
    ChannelService.prototype.find = function (id) {
        return this.db.first("match (c:Channel {id: {id}}) return c", { id: id })
            .then(function (r) { return r && r.c ? new graph_1.Channel(r.c) : null; });
    };
    ChannelService.prototype.findAll = function () {
        return this.db.query("match (c:Channel) return c")
            .then(function (results) { return results.map(function (r) { return r.c; }); });
    };
    ChannelService.prototype.getPosts = function (id, userId) {
        return this.db.query("\n            match (c:Channel {id: {id}})-[]-(p:Post)\n            match (issuer:User)-[:USER_POST]-(p)\n            optional match (uLike:User {id: {userId}})-[l:LIKE*0..1]-(p)\n            with  p, issuer, c, case when l is not null then true else false end as liked\n            optional match (p)-[:POST_COMMENT]-(comment:Post)-[:USER_COMMENT]-(commenter:User)\n            return p, issuer, c, liked,\n                case when comment is not null then collect({post: comment, issuer: commenter}) else [] end as comments\n            order by p.creationTime desc\n        ", { id: id, userId: userId })
            .then(function (res) { return res.map(function (r) {
            r.p.user = {
                id: r.issuer.id,
                username: r.issuer.username,
                pictureUrl: r.issuer.pictureUrl || ""
            };
            r.p.channel = r.c;
            r.p.liked = r.liked;
            r.p.comments = r.comments.map(function (c) {
                c.post.user = {
                    id: c.issuer.id,
                    username: c.issuer.username,
                    pictureUrl: c.issuer.pictureUrl || ""
                };
                c.post.channel = r.c;
                return c.post;
            });
            r.p.comments = _.orderBy(r.p.comments, function (c) { return c.creationTime; });
            return r.p;
        }); });
    };
    ChannelService.prototype.addPost = function (id, newPost) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var post, user, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = new graph_1.Post();
                        post.message = newPost.message;
                        return [4 /*yield*/, this.userStore.find(newPost.userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.find(id)];
                    case 2:
                        channel = _a.sent();
                        if (!user) {
                            throw new Error("Unknown user");
                        }
                        if (!channel) {
                            throw new Error("Unknown channel");
                        }
                        return [2 /*return*/, this.db.transaction(function (db) { return __awaiter(_this, void 0, void 0, function () {
                                var userPost, channelPost;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db.createVertex(post)];
                                        case 1:
                                            _a.sent();
                                            userPost = new graph_1.UserPostEdge(user, post);
                                            channelPost = new graph_1.ChannelPostEdge(channel, post);
                                            return [4 /*yield*/, db.createEdge(userPost)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, db.createEdge(channelPost)];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/, post];
                                    }
                                });
                            }); }).then(function (p) {
                                var post = p;
                                post.user = {
                                    id: user.id,
                                    username: user.username,
                                    pictureUrl: user.pictureUrl
                                };
                                post.channel = channel;
                                post.liked = false;
                                post.comments = [];
                                _this.socketService.emit("post:add", post);
                                return p;
                            })];
                }
            });
        });
    };
    return ChannelService;
}());
ChannelService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __param(1, inversify_1.inject(constants_1.TYPES.UserStore)),
    __param(2, inversify_1.inject(constants_1.TYPES.SocketService)),
    __metadata("design:paramtypes", [Object, index_1.UserStore,
        index_1.SocketService])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=ChannelService.js.map