import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEST_EMAIL = process.env.EMAIL_TO || "allazatradingllc@gmail.com";
const BUSINESS_PHONE = "+971 56 276 8681";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/enquiry", async (req, res) => {
    const { name, email, subject, message } = req.body;
    const timestamp = new Date().toISOString();

    console.log("==========================================");
    console.log(`[${timestamp}] New Enquiry Received for Al-Laza Trading L.L.C:`);
    console.log(`Target Email: ${DEST_EMAIL}`);
    console.log(`Target Phone: ${BUSINESS_PHONE}`);
    console.log(`From Name: ${name}`);
    console.log(`From Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    const emailUser = process.env.EMAIL_USER || DEST_EMAIL;
    const emailPass = process.env.EMAIL_PASS;

    let emailSent = false;
    let emailStatusMessage = "";

    if (emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: `"Al-Laza Website" <${emailUser}>`,
          to: DEST_EMAIL,
          replyTo: email,
          subject: `[Website Enquiry] ${subject || "No Subject"} - From ${name}`,
          text: `
New enquiry received from Al-Laza Trading L.L.C website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
Sent to: ${DEST_EMAIL}
Business Phone: ${BUSINESS_PHONE}
          `,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <div style="background-color: #D1644D; padding: 15px; border-radius: 6px; color: white;">
    <h2 style="margin: 0; font-size: 20px;">Al-Laza Trading L.L.C - New Customer Enquiry</h2>
  </div>
  <div style="padding: 20px 0;">
    <p><strong>Sender Name:</strong> ${name}</p>
    <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p><strong>Message:</strong></p>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5;">${message}</div>
  </div>
  <div style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px;">
    Sent to: <strong>${DEST_EMAIL}</strong> | Associated Contact: <strong>${BUSINESS_PHONE}</strong>
  </div>
</div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        emailStatusMessage = `Email successfully dispatched to ${DEST_EMAIL}`;
        console.log(emailStatusMessage);
      } catch (err: any) {
        console.error("Nodemailer dispatch error:", err);
        emailStatusMessage = `Email dispatch error: ${err.message}`;
      }
    } else {
      console.warn(`EMAIL_PASS not configured in environment. The message was logged and queued for ${DEST_EMAIL}.`);
      emailStatusMessage = `Enquiry recorded for ${DEST_EMAIL}`;
    }

    return res.status(200).json({
      success: true,
      emailSent,
      targetEmail: DEST_EMAIL,
      targetPhone: BUSINESS_PHONE,
      message: emailStatusMessage || "Enquiry received successfully!",
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Enquiries configured for email: ${DEST_EMAIL} and phone: ${BUSINESS_PHONE}`);
  });
}

startServer();
