"use strict";
var passport_http_bearer_1 = require("passport-http-bearer");
var index_1 = require("./env/index");
var kernel_1 = require("./kernel");
var constants_1 = require("../constants");
var jwt = require("jsonwebtoken");
var BearerStrategy = require("passport-http-bearer").Strategy;
function configureAuthentication(passport) {
    // Configure the Bearer strategy for use by Passport.
    //
    // The Bearer strategy requires a `verify` function which receives the
    // credentials (`token`) contained in the request.  The function must invoke
    // `cb` with a user object, which will be set at `req.user` in route handlers
    // after authentication.
    passport.use(new passport_http_bearer_1.Strategy(function (token, cb) {
        var db = kernel_1.default.get(constants_1.TYPES.UserStore);
        try {
            var identity_1 = jwt.verify(token, index_1.default.jwtSecret);
            db.find(identity_1.id).then(function (user) {
                var time = new Date().getTime();
                if (user
                    && user.enabled
                    && user.accessToken
                    && user.accessToken === token
                    && identity_1.expirationTime > time) {
                    cb(null, user);
                }
                else {
                    cb(null, false);
                }
            }).catch(function (e) {
                cb(e);
            });
        }
        catch (e) {
            cb(null, false);
        }
    }));
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  In a
    // production-quality application, this would typically be as simple as
    // supplying the user ID when serializing, and querying the user record by ID
    // from the database when deserializing.  However, due to the fact that this
    // example does not have a database, the complete Twitter profile is serialized
    // and deserialized.
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
    return passport;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureAuthentication;
//# sourceMappingURL=authentication.js.map