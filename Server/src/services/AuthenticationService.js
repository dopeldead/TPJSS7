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
var jwt = require("jsonwebtoken");
var index_1 = require("../config/env/index");
var inversify_1 = require("inversify");
var constants_1 = require("../constants");
var store_1 = require("./store");
var crypto = require("crypto");
var AuthenticationService = AuthenticationService_1 = (function () {
    function AuthenticationService(userStore) {
        this.userStore = userStore;
    }
    AuthenticationService.prototype.createToken = function (claims) {
        claims.expirationTime = new Date().getTime() + AuthenticationService_1.TOKEN_LIFETIME;
        return jwt.sign(claims, index_1.default.jwtSecret);
    };
    AuthenticationService.prototype.hashPassword = function (password) {
        return crypto
            .createHash("sha1")
            .update(password)
            .digest("hex");
    };
    AuthenticationService.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordHash, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userStore.findByName(username)];
                    case 1:
                        user = _a.sent();
                        passwordHash = this.hashPassword(password);
                        if (!(user && username === user.username && passwordHash === user.passwordHash)) return [3 /*break*/, 3];
                        accessToken = this.createToken({
                            id: user.id,
                            username: user.username,
                            expirationTime: new Date().getTime() + AuthenticationService_1.TOKEN_LIFETIME
                        });
                        user.accessToken = accessToken;
                        return [4 /*yield*/, this.userStore.update(user)];
                    case 2:
                        _a.sent();
                        delete user.passwordHash;
                        return [2 /*return*/, {
                                succeeded: true,
                                accessToken: accessToken,
                                user: user
                            }];
                    case 3: return [2 /*return*/, { succeeded: false }];
                }
            });
        });
    };
    AuthenticationService.prototype.register = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passwordHash = this.hashPassword(newUser.password);
                        return [4 /*yield*/, this.userStore.create(newUser.username, passwordHash, newUser.email, newUser.pictureUrl)];
                    case 1:
                        user = _a.sent();
                        delete user.passwordHash;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return AuthenticationService;
}());
AuthenticationService.TOKEN_LIFETIME = 1000 * 3600 * 24 * 7; // one week
AuthenticationService = AuthenticationService_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.UserStore)),
    __metadata("design:paramtypes", [store_1.UserStore])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var AuthenticationService_1;
//# sourceMappingURL=AuthenticationService.js.map