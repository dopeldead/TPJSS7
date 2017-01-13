"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var inversify_1 = require("inversify");
var socketServer;
function setSocketServer(socket) {
    socketServer = socket;
    socket.on("connection", function (clientSocket) {
        console.log("New connection " + clientSocket.id);
    });
}
exports.setSocketServer = setSocketServer;
var SocketService = (function () {
    function SocketService() {
    }
    SocketService.prototype.on = function (event, listener) {
        socketServer.on(event, listener);
    };
    SocketService.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        socketServer.emit(event, data);
    };
    return SocketService;
}());
SocketService = __decorate([
    inversify_1.injectable()
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=SocketService.js.map