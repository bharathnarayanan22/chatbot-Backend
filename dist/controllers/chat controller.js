"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChtaCompletion = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const openai_1 = __importDefault(require("openai"));
const generateChtaCompletion = async (req, res, next) => {
    console.log("Request received for generating chat completion");
    const { message } = req.body;
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        // grap chats from user
        const chats = user.chats.map(({ role, content }) => ({
            role: "user",
            content,
            name: user?.name
        }));
        console.log(chats);
        // Add new message to the chats
        chats.push({ content: message, role: "user", name: user?.name });
        user.chats.push({ content: message, role: "user", name: user?.name });
        // Initialize OpenAI instance
        const openai = new openai_1.default({ apiKey: process.env.OPEN_AI_SECRET, organization: process.env.OPENAI_ORGANIZATION_ID });
        // Send all chats with new one to OpenAI API
        const chatResponse = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: chats });
        // Extract the completed message from the response
        // Save the completed message to the user's chats
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        // Send the updated chats array in the response
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};
exports.generateChtaCompletion = generateChtaCompletion;
const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunction");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunction");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chat%20controller.js.map