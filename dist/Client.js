/*! For license information please see Client.js.LICENSE.txt */
!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.SocketRoomsClient=o():e.SocketRoomsClient=o()}(this,(()=>(()=>{"use strict";var __webpack_modules__={"./src/client/index.ts":(__unused_webpack_module,exports,__webpack_require__)=>{eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar common_1 = __webpack_require__(/*! src/common */ \"./src/common/index.ts\");\nvar roomResponseCallbacks = {};\nvar setResponse = function (roomId, responseCallback) {\n    roomResponseCallbacks[roomId] = responseCallback;\n};\nvar sendMessageToRoom = function (roomId, message) {\n    var _a = window.socketRooms, socket = _a.socket, me = _a.me;\n    if (me == null) {\n        console.error('Something went wrong, current session has not be initialized properly.');\n        return;\n    }\n    var md = new common_1.MessageData(me.id, message, roomId);\n    socket.emit(common_1.Events.SEND_MESSAGE, md);\n};\nvar joinRoom = function (roomId, responseCallback) {\n    var _a = window.socketRooms, socket = _a.socket, me = _a.me;\n    return new Promise(function (res, rej) {\n        socket.on(common_1.Events.LISTEN_FOR_MESSAGES(roomId), function (data) {\n            if ((me === null || me === void 0 ? void 0 : me.id) == data.from)\n                return;\n            if (roomId in roomResponseCallbacks) {\n                responseCallback = roomResponseCallbacks[roomId];\n            }\n            if (responseCallback) {\n                responseCallback(data);\n            }\n            else {\n                console.error('Response callback not provided.');\n            }\n        });\n        socket.on(common_1.Events.JOIN_ROOM_RESPONSE, function (data) {\n            console.log('RESPONSE');\n            window.socketRooms.me = data.data.member;\n            if (data.success) {\n                res(data);\n            }\n            else {\n                rej(data);\n            }\n        });\n        socket.emit(common_1.Events.JOIN_ROOM, { roomId: roomId, member: me });\n    });\n};\nvar init = function (userProvidedSocket) {\n    window.socketRooms = { socket: null, me: null };\n    var _a = window.socketRooms, socket = _a.socket, me = _a.me;\n    var promise = new Promise(function (res, _) {\n        if (socket !== null && me !== null) {\n            res('Already Connected');\n            return;\n        }\n        userProvidedSocket.on('connect', function () {\n            window.socketRooms = { socket: userProvidedSocket, me: new common_1.Member(userProvidedSocket.id) };\n            res('Connected');\n        });\n    });\n    return promise;\n};\nvar getJoinedRooms = function () {\n    var me = window.socketRooms.me;\n    return me === null || me === void 0 ? void 0 : me.rooms;\n};\nexports[\"default\"] = { init: init, joinRoom: joinRoom, sendMessageToRoom: sendMessageToRoom, setResponse: setResponse, getJoinedRooms: getJoinedRooms };\n\n\n//# sourceURL=webpack://SocketRooms/./src/client/index.ts?")},"./src/common/Events.ts":(__unused_webpack_module,exports)=>{eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = {\n    JOIN_ROOM: 'JOIN_ROOM',\n    JOIN_ROOM_RESPONSE: 'JOIN_ROOM_RESPONSE',\n    SEND_MESSAGE: 'SEND_MESSAGE',\n    LISTEN_FOR_MESSAGES: function (roomId) { return \"LISTEN_FOR_MESSAGES_\".concat(roomId); }\n};\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/Events.ts?")},"./src/common/Member.ts":(__unused_webpack_module,exports)=>{eval('\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.Member = void 0;\nvar Member = (function () {\n    function Member(id) {\n        this.rooms = [];\n        this.id = id;\n    }\n    return Member;\n}());\nexports.Member = Member;\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/Member.ts?')},"./src/common/MessageData.ts":(__unused_webpack_module,exports)=>{eval('\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.MessageData = void 0;\nvar MessageData = (function () {\n    function MessageData(from, message, roomId) {\n        this.from = from;\n        this.message = message;\n        this.roomId = roomId;\n    }\n    return MessageData;\n}());\nexports.MessageData = MessageData;\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/MessageData.ts?')},"./src/common/Response.ts":(__unused_webpack_module,exports)=>{eval('\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.Response = void 0;\nvar Response = (function () {\n    function Response(success, message, data) {\n        this.success = success;\n        this.message = message;\n        this.data = data;\n    }\n    return Response;\n}());\nexports.Response = Response;\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/Response.ts?')},"./src/common/Room.ts":(__unused_webpack_module,exports)=>{eval('\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.Room = void 0;\nvar Room = (function () {\n    function Room(id, capacity) {\n        this.capacity = null;\n        this.members = [];\n        this.id = id;\n        if (capacity) {\n            this.capacity = capacity;\n        }\n    }\n    Room.prototype.hasMember = function (memberId) {\n        for (var i = 0; i < this.members.length; ++i) {\n            if (this.members[i] === memberId)\n                return true;\n        }\n        return false;\n    };\n    Room.prototype.addMember = function (memberId) {\n        if (this.hasMember(memberId))\n            return false;\n        this.members.push(memberId);\n        return true;\n    };\n    Room.prototype.removeMember = function (id) {\n        this.members = this.members.filter(function (memberId) {\n            return memberId !== id;\n        });\n    };\n    return Room;\n}());\nexports.Room = Room;\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/Room.ts?')},"./src/common/index.ts":function(__unused_webpack_module,exports,__webpack_require__){eval('\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.Response = exports.Events = exports.Member = exports.MessageData = exports.Room = void 0;\nvar Room_1 = __webpack_require__(/*! ./Room */ "./src/common/Room.ts");\nObject.defineProperty(exports, "Room", ({ enumerable: true, get: function () { return Room_1.Room; } }));\nvar MessageData_1 = __webpack_require__(/*! ./MessageData */ "./src/common/MessageData.ts");\nObject.defineProperty(exports, "MessageData", ({ enumerable: true, get: function () { return MessageData_1.MessageData; } }));\nvar Response_1 = __webpack_require__(/*! ./Response */ "./src/common/Response.ts");\nObject.defineProperty(exports, "Response", ({ enumerable: true, get: function () { return Response_1.Response; } }));\nvar Member_1 = __webpack_require__(/*! ./Member */ "./src/common/Member.ts");\nObject.defineProperty(exports, "Member", ({ enumerable: true, get: function () { return Member_1.Member; } }));\nvar Events_1 = __importDefault(__webpack_require__(/*! ./Events */ "./src/common/Events.ts"));\nexports.Events = Events_1.default;\n\n\n//# sourceURL=webpack://SocketRooms/./src/common/index.ts?')}},__webpack_module_cache__={};function __webpack_require__(e){var o=__webpack_module_cache__[e];if(void 0!==o)return o.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}var __webpack_exports__=__webpack_require__("./src/client/index.ts");return __webpack_exports__})()));