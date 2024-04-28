# Info Webhook

A simple webhook endpoint built with Node.js and Express that logs visits to a specific link and sends the visitor's info to a Discord webhook.

## Features

- Logs visits to a specific link.
- Sends the visitor's IP address to a Discord webhook.
- The URL includes a base64-encoded string for identifying who opened the link.

## Setup for Vercel

1. **Deploy the project to Vercel:**

   - Fork this repository.
   - Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
   - Click on "Import Project" and select the forked repository.
   - Set the environment variable `DISCORD_WEBHOOK_URL` with the Discord webhook URL.

2. **Test the webhook:**

Once the project is deployed, visit the webhook endpoint (`https://your-vercel-app.vercel.app?u=base64_encoded_string`) in your browser, replacing `your-vercel-app` with the name of your Vercel app and `base64_encoded_string` with a base64 encoded string which will be represented in the webhook as `Opened by: base64_encoded_string`.

### Customizable URL

You must include a base64-encoded string as a query parameter `u` at the end of the URL to customize the behaviour of the webhook. This encoded string will be decoded and used to indicate who opened the URL in the Discord webhook message. For example:

`https://your.site?u=dGVzdF91c2Vy`

In this example, the base64-encoded string `dGVzdF91c2Vy` represents the text "test_user" when decoded.
The Discord webhook message will include a section indicating that the URL was opened by "test_user".

## Legal Disclaimer

This repository and its contents are provided for educational and informational purposes only. The code and resources shared here are not intended for production use without proper testing and validation.

The author makes no representations or warranties regarding the accuracy, completeness, or suitability of the information shared. Any reliance you place on such information is therefore strictly at your own risk.

In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data, or profits, arising out of or in connection with the use or performance of any information shared on this repository.

You are solely responsible for determining the appropriateness of using and/or modifying any code shared here, and you agree to comply with all applicable laws and regulations. Use of the code and resources shared in this repository constitutes your acceptance of these terms.
