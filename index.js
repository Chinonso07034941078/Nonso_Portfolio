// In your API route (e.g., pages/api/send-email.js)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, from, subject, text, html } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}