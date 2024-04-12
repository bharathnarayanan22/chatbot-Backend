import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import { deleteChats, generateChtaCompletion, sendChatsToUser } from "../controllers/chat controller";
import { verifyUser } from "../controllers/user-controller";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  verifyToken,
  validate(chatCompletionValidator),
  generateChtaCompletion
);

chatRoutes.get(
    "/all-chats",
    verifyToken,
    sendChatsToUser
    
  );

  chatRoutes.delete(
    "/delete",
    verifyToken,
    deleteChats
  );



export default chatRoutes;
