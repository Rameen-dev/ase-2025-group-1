import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the API key from the environmental variables (.env file)
const API_KEY = process.env.GEMINI_API_KEY;
const URL_LOCAL_HOST = process.env.API_BASE_URL;
// If the key is missing, we throw a clear error
if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in .env File. Please check!");
}

// Create Gemini client once (Outside the handler so it can be reused)
const genAI = API_KEY? new GoogleGenerativeAI(API_KEY) : null;

// Choose which Gemini model we want to use
const modelName = "gemini-2.5-flash"; // This model is fast and cheap.
const sustainWearKnowledge = `
SustainWear Overview
- SustainWear is a clothes donation and redistribution platform.
- It connects three main roles: Donors, Charities, and Admins.
- The goal is to reduce clothing waste and support communities through sustainable redistribution.

User Roles
Donors
- Donors create an account and log in.
- They can submit donation requests describing the clothes they want to donate.
- Each donation request can include multiple clothing items with details like type, size, condition, and images.
- Donors can see the status of their donation requests (e.g. pending, accepted, collected, completed).

Charities
- Charities apply to join SustainWear through a charity application form.
- Admins review charity applications and can approve or reject them.
- Approved charities get access to a charity dashboard.
- Charities can view available donations assigned to them, update statuses, and manage which items they receive.

Admins
- Admins manage the overall platform.
- They can review and approve charity applications.
- They can view all users, donations, charities and key sustainability metrics.
- Admins can monitor the flow of clothing items and ensure fair and efficient redistribution.

Donation & Clothing Items Flow
- A Donor submits a donation request.
- Each clothing item has: type (e.g. shirt, jeans), size, condition (e.g. new, good, worn), and images.
- Once approved and matched, items are assigned to a specific charity.
- Ownership can be transferred from the donor to that charity.
- The system tracks which charity “owns” each item using an owned_by or similar field.

Sustainability & Analytics
- SustainWear tracks how many items have been donated and redistributed.
- Admin dashboards can show statistics such as:
  - Total donations
  - Number of items successfully given to charities
  - Popular item types and sizes
  - Potential impact on reducing textile waste

If the user asks about navigation (signup, login, charity application, donating),
include a section at the end and use the links below depending on what the user is asking for:
When including links, ALWAYS format them as Markdown links and make sure the link is noticable with colour and styling:

- [Signup](http://localhost:3000/auth/signup)
- [Login](http://localhost:3000/auth/login)
- [Charity application](http://localhost:3000/auth/charity-application)

Only include links that are relevant to the user's question

General Behaviour
- Do NOT invent new platform features that do not exist.
- If you are unsure about a detail, say that the feature is not clearly defined in the current SustainWear documentation.
- Always encourage users to follow the platform's guidance for safety, privacy, and sustainability.
`;

// Our API Route handler
export async function POST(req: NextRequest) {
    try {
        if (!genAI) {
            return NextResponse.json(
                { error: "Server is not configured with GEMINI_API_KEY" },
                { status: 500}
            );
        }
    

    // We read the JSON body from the request
    // The frontend sends: {Messages: [{ role: "user" | "assistant", content: string}] }
    const body = await req.json();
    const messages = body.messages as { role: string; content: string}[];

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json(
            { error: "No messages provided"},
            { status: 400 }
        );
    }

    // Here I build a prompt for Gemini
    // This is the systems instruction message to make sure it doesn't go rogue

    const systemInstruction = `
    You are SustainWear's virtual assistant. Your job is to:
    - Answer only questions about the SustainWear Platform.
    - SustainWear is a clothes donation and redistribution platform connecting donors, charities and admins.
    - You can explain features like: donation requests, clothing items, charities, donor accounts, admin dashboards, sustainability analytics, etc
    - If a question is not related to SustainWear, politely say:
    "I'm here to help with SustainWear-related questions only.
    Tone: Be friendly, clear, concise. Short paragraphs and simple language`;

    // Convert conversation history into a single text block
    // We can use this to later improve with a structured chat format.
    const historyText = messages
    .map((m) => {
        const prefix = m.role === "user" ? "User:" : "Assistant:";
        return `${prefix} ${m.content}`;

    })
    .join("\n");

    const linkCatalog = `
    Available links below:
    - Signup: ${URL_LOCAL_HOST}/auth/signup`;


    const fullPrompt = `${systemInstruction}\n\n
    
    Here is official SustainWear knowledge you must use when answering: ${sustainWearKnowledge}\n\n

    ${linkCatalog} 

    Conversation so far:\n${historyText}\n\nAssistant:`;

    // Here we call Gemini with the prompt
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent({
        contents: [
            {
            role: "User",
            parts: [{ text: fullPrompt }],
            },
        ],
    });

    // Extract text from Gemini's response
    const response = result.response;
    const text = response.text();

    // Here we return the text as JSON back to the frontend
    return NextResponse.json({ reply: text});

    } catch (error) {
        console.error("Error in /api/support-chat:", error);

        return NextResponse.json(
            { error: "Something went wrong while talking to the SustainWear assistant"},
            { status: 500}
        );
    }
}