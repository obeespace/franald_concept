import nodemailer from "nodemailer";
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone, orderId, ...orderData } = req.body;
    // Save order to DB
    // ...existing code...

    // Send order ID to email
    try {
      const transporter = nodemailer.createTransport({
        // Configure your SMTP settings
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Order Confirmation",
        text: `Thank you for your order! Your Order ID is: ${orderId}`,
      });
    } catch (err) {
      console.error("Email send error:", err);
      // Optionally handle email error
    }

    // Send order ID to WhatsApp if phone is provided
    if (phone) {
      try {
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: `whatsapp:${phone}`,
          contentSid: process.env.TWILIO_WHATSAPP_TEMPLATE_SID, // Add this to your .env
          contentVariables: JSON.stringify({
            "1": orderId,
            // Add more variables if your template needs them
          }),
        });
      } catch (err) {
        console.error("WhatsApp send error:", err);
        // Optionally handle WhatsApp error
      }
    }

    // ...existing code...
    res.status(200).json({ success: true, orderId });
  }
  // ...existing code...
}