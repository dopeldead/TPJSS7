"use strict";
var logger = require("morgan");
var httpStatus = require("http-status");
var env_1 = require("./env");
var winston_1 = require("./winston");
var APIError_1 = require("../utils/APIError");
var passport = require("passport");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compress = require("compression");
var cors = require("cors");
var expressWinston = require("express-winston");
var expressValidation = require("express-validation");
var methodOverride = require("method-override");
function configureExpress(app) {
    if (env_1.default.env === "development") {
        app.use(logger("dev"));
    }
    // parse body params and attache them to req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(compress());
    app.use(methodOverride());
    // disable 'X-Powered-By' header in response
    app.disable("x-powered-by");
    // enable CORS - Cross Origin Resource Sharing
    app.use(cors());
    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
    // enable detailed API logging in dev env
    if (env_1.default.env === "development") {
        expressWinston.requestWhitelist.push("body");
        expressWinston.responseWhitelist.push("body");
        app.use(expressWinston.logger({
            winstonInstance: winston_1.default,
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
            colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
        }));
    }
}
exports.configureExpress = configureExpress;
function configureErrors(app) {
    // if error is not an instanceOf APIError, convert it.
    app.use(function (err, req, res, next) {
        if (err instanceof expressValidation.ValidationError) {
            // validation error contains errors which is an array of error each containing message[]
            var unifiedErrorMessage = err.errors.map(function (error) { return error.messages.join(". "); }).join(" and ");
            var error = new APIError_1.default(unifiedErrorMessage, err.status, true);
            return next(error);
        }
        else if (!(err instanceof APIError_1.default)) {
            var apiError = new APIError_1.default(err.message, err.status, err.isPublic);
            return next(apiError);
        }
        return next(err);
    });
    // // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        console.log(res.statusCode);
        var err = new APIError_1.default("API not found", httpStatus.NOT_FOUND);
        return next(err);
    });
    // // log error in winston transports except when executing test suite
    if (env_1.default.env !== "test") {
        app.use(expressWinston.errorLogger({
            winstonInstance: winston_1.default
        }));
    }
    // // error handler, send stacktrace only during development
    app.use(function (err, req, res, next) {
        return res.status(err.status).json({
            message: err.isPublic ? err.message : httpStatus[err.status],
            stack: env_1.default.env === "development" ? err.stack : {}
        });
    });
}
exports.configureErrors = configureErrors;
;
//# sourceMappingURL=express.js.map