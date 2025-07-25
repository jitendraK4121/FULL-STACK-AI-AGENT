import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  console.log("Analyzing ticket:", ticket.title);
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets. 

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response =
    await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "high",
"helpfulNotes": "Here are useful tips...",
"relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`);

  let raw;
  try {
    // Try different possible response structures
    if (response.output && response.output[0] && response.output[0].context) {
      raw = response.output[0].context;
    } else if (response.text) {
      // Some versions return direct text
      raw = response.text;
    } else if (response.content) {
      // Some versions use content
      raw = response.content;
    } else if (typeof response === 'string') {
      // Sometimes it might return the string directly
      raw = response;
    } else {
      // Last resort, stringify the whole response
      raw = JSON.stringify(response);
    }
    
    console.log("Raw AI response:", raw);
    
    // Extract JSON from the response, handling both raw JSON and markdown-wrapped JSON
    let jsonString = raw.trim();
    // Remove markdown code blocks if present
    if (jsonString.includes('```')) {
      jsonString = jsonString.replace(/```json\n|```/g, '').trim();
    }
    // Handle potential nested JSON strings
    if (typeof jsonString === 'string' && jsonString.includes('\\"')) {
      jsonString = jsonString.replace(/\\"/g, '"');
    }
    const result = JSON.parse(jsonString);
    console.log("AI analysis result:", result);
    return result;
  } catch (e) {
    console.log("Failed to parse JSON from AI response: " + e.message);
    console.log("Response structure:", JSON.stringify(response, null, 2));
    return null;
  }
};

export default analyzeTicket;