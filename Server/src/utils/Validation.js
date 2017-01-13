"use strict";
require("reflect-metadata");
var _ = require("lodash");
var joi = require("joi");
exports.Key = "AnnotationMeta";
function Constraint(joi) {
    return function (target, propertyKey) {
        var meta = _.assign({}, Reflect.getMetadata(exports.Key, target.constructor));
        meta[propertyKey] = joi;
        Reflect.defineMetadata(exports.Key, meta, target.constructor);
    };
}
exports.Constraint = Constraint;
function validate(targetClass, instance) {
    var meta = Reflect.getMetadata(exports.Key, targetClass);
    if (!meta) {
        return {
            error: null,
            value: {}
        };
    }
    var schema = meta.__schema;
    if (!schema) {
        schema = joi.object().keys(meta);
        meta.__schema = schema;
        Reflect.defineMetadata(exports.Key, meta, targetClass);
    }
    return joi.validate(instance, schema);
}
exports.validate = validate;
function validateBody(bodyType) {
    return function (req, res, next) {
        var validation = validate(bodyType, req.body);
        if (validation.error) {
            res.status(400);
            return res.json(validation.error);
        }
        next();
    };
}
exports.validateBody = validateBody;
function validateQuery(queryType) {
    return function (req, res, next) {
        var validation = validate(queryType, req.query);
        if (validation.error) {
            res.status(400);
            return res.json(validation.error);
        }
        next();
    };
}
exports.validateQuery = validateQuery;
//# sourceMappingURL=Validation.js.map