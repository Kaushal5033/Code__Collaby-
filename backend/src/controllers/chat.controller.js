
import { Message } from "../models/message.model.js";

export const getChatHistory = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId || roomId.length > 100) {
      return res.status(400).json({
        message: "Invalid room ID",
      });
    }

    const messages = await Message.find({ roomId })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      messages: messages.reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch chat history",
      error: error.message,
    });
  }
};
