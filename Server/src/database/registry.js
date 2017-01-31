"use strict";
var ClassRegistry = (function () {
    function ClassRegistry() {
        this._classes = {};
    }
    Object.defineProperty(ClassRegistry, "current", {
        get: function () {
            if (!ClassRegistry._current) {
                ClassRegistry.initialize();
            }
            return ClassRegistry._current;
        },
        enumerable: true,
        configurable: true
    });
    ClassRegistry.initialize = function () {
        ClassRegistry._current = new ClassRegistry();
    };
    ClassRegistry.prototype.register = function (className, gClass) {
        this._classes[className] = gClass;
    };
    ClassRegistry.prototype.getClasses = function () {
        return this._classes;
    };
    return ClassRegistry;
}());
exports.ClassRegistry = ClassRegistry;
//# sourceMappingURL=registry.js.map