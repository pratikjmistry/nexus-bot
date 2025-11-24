import { ActivityHandler } from "botbuilder";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class NexusBot extends ActivityHandler {
    constructor() {
        super();

        // When user sends a message
        this.onMessage(async (context) => {
            const userText = context.activity.text || "";

            // Send to OpenAI
            const completion = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are Nexus, an AI meeting assistant." },
                    { role: "user", content: userText }
                ]
            });

            const reply = completion.choices[0].message.content;

            await context.sendActivity(reply);
        });

        // When bot is added to chat
        this.onMembersAdded(async (context) => {
            await context.sendActivity("👋 Hi, I'm Nexus — your AI meeting assistant.");
        });
    }
}
