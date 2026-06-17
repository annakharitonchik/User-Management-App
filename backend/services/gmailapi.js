import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

export async function sendVerificationEmail(email, token) {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const link = `${process.env.SERVER_URL}/api/auth/verify/${token}`;
    const utf8Subject = `=?utf-8?B?${Buffer.from("Verify your account").toString("base64")}?=`;
    const messageParts = [
      `From: "noreply.usermanagementapp@gmail.com"`,
      `To: ${email}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      ` 
    <h2>Verify your account</h2>
    <p>Click the link below:</p>
    <a href="${link}">${link}</a>
  `,
    ];
    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("Message is send successfully", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Error with Gmail API:", error);
    throw error;
  }
}
