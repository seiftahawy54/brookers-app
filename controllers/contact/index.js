import Models from "../../models/index.js";

const postSendContactMessage = async (req, res, next) => {
  const { name, email, message } = req.body;
  const newMessage = new Models.Contact({
    senderName: name,
    senderEmail: email,
    message,
  });

  try {
    await newMessage.save();

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (e) {
    return res.status(400).json({
      message: "Message failed",
      reason: e,
    });
  }
};

export default {
  postSendContactMessage,
};
