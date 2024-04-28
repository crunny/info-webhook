import express from "express";
import dotenv from "dotenv";
import webhookHandler from "./api/webhook.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Define the route for your webhook endpoint
app.get("/api/webhook", webhookHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
