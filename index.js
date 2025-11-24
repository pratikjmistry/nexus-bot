import restify from "restify";
import { BotFrameworkAdapter } from "botbuilder";
import dotenv from "dotenv";
import { NexusBot } from "./bot.js";

dotenv.config();

// Create adapter for Teams messages
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Error handler
adapter.onTurnError = async (context, error) => {
    console.error("❌ Bot Error:", error);
    await context.sendActivity("The Nexus bot encountered an error.");
};

// Create the bot instance
const bot = new NexusBot();

// Create Restify server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Messages endpoint for Teams
server.post('/api/messages', async (req, res) => {
    await botAdapter.process(req, res);
});


// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Nexus bot running on port ${PORT}`);
    console.log(`🔗 Endpoint: http://localhost:${PORT}/api/messages`);
});
