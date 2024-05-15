const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { sender, receiver, subject, body } = req.body;
    const newMessage = new Message({ sender, receiver, subject, body });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

// Get messages for a user
exports.getMessagesForUser = async (req, res) => {
  try {
    const email = req.params.email;
    const messages = await Message.find({
      $or: [{ sender: email }, { receiver: email }]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
