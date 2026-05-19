import ContactMessage from "../models/ContactMessage.js";

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, source } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required",
      });
    }

    await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
      source: source || "contact-form",
    });

    return res.status(200).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("Contact submit error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export const listContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Contact list error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
};
