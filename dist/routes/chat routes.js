"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_1 = require("../utils/token-manager");
const validators_1 = require("../utils/validators");
const chat_controller_1 = require("../controllers/chat controller");
const chatRoutes = (0, express_1.Router)();
chatRoutes.post("/new", token_manager_1.verifyToken, (0, validators_1.validate)(validators_1.chatCompletionValidator), chat_controller_1.generateChtaCompletion);
chatRoutes.get("/all-chats", token_manager_1.verifyToken, chat_controller_1.sendChatsToUser);
chatRoutes.delete("/delete", token_manager_1.verifyToken, chat_controller_1.deleteChats);
exports.default = chatRoutes;
//# sourceMappingURL=chat%20routes.js.map