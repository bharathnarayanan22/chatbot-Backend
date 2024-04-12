"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: crypto_1.randomUUID
    },
    role: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
});
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    chats: [chatSchema],
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map