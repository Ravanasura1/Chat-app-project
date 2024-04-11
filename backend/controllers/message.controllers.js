import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id

    // agar message ya receiver dono me se koi ek bhi nahi hai to response bhej do error ka

    if (!message || !receiverId) {
      return res.status(400).json({ error: "Message content or receiver ID is missing" })
    }

    // search karo sari conversation sender or receiver ke bich me hui hai

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    // agar conversation kabhi nahi hui hai to create kar do

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    // new conversation me new message bana do jisme sender, recier ki id bhej do

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    // newMessage agar hai to use messsage ke array me push kardo

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // await conversation.save(); ye ek ke bad ek resolve honge
    // await newMessage.save();

    // ye parallel dono ko chalayega

    await Promise.all([conversation.save(), newMessage.save()])

    // response send karo with new message

    res.status(201).json(newMessage)

  } catch (error) {
    console.log("Error in sendMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getMessage = async (req, res) => {
  try {
    const {id: userToChat} = req.params
    const senderId = req.user._id
    

    const converversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat]}
    }).populate("messages")

    if(!converversation) return res.status(200).json([]);

    const messages = converversation.messages;

    res.status(200).json(messages)

  } catch (error) {
    console.log("Error in getMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}