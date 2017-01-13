"use strict";
var passport = require("passport");
function authorize() {
    return passport.authenticate("bearer", { session: false });
}
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map