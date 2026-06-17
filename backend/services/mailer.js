import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:5000/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirm your email",
    html: `
      <h2>Verify your account</h2>
      <p>Click the link:</p>
      <a href="${link}">${link}</a>
    `,
  });
};
