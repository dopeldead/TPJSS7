"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var httpStatus = require("http-status");
/**
 * @extends Error
 */
var ExtendableError = (function (_super) {
    __extends(ExtendableError, _super);
    function ExtendableError(message, status, isPublic) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        _this.status = status;
        _this.isPublic = isPublic;
        _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(_this, _this.name);
        return _this;
    }
    return ExtendableError;
}(Error));
/**
 * Class representing an API error.
 * @extends ExtendableError
 */
var APIError = (function (_super) {
    __extends(APIError, _super);
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    function APIError(message, status, isPublic) {
        if (status === void 0) { status = httpStatus.INTERNAL_SERVER_ERROR; }
        if (isPublic === void 0) { isPublic = false; }
        return _super.call(this, message, status, isPublic) || this;
    }
    return APIError;
}(ExtendableError));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = APIError;
//# sourceMappingURL=APIError.js.map