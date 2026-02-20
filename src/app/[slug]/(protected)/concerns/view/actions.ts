"use server";

export async function generateDescription(text: string) {
  try {
    const systemPrompt = `You are a summarisation assistant for HowsWork, a workplace psychosocial safety platform.

Summarise the following employee concern for a risk register entry and assess its risk level.

Return a JSON object with exactly two fields:
- "description": a one to two sentence summary of the concern
- "riskLevel": an integer, either 1 (Low), 2 (Medium), or 3 (High)

The description should be:
- Written in third person (e.g. "An employee reported..." not "I experienced...")
- One to two sentences maximum
- Focused on the hazard and its workplace impact
- Free of any identifying details about the employee

Do not:
- Prefix the description with labels like "Reported risk:" or "Summary:"
- Interpret or classify the behaviour — just describe what was reported
- Include recommendations or suggested actions in the description

Risk level guidance:
- 1 (Low): Minor interpersonal friction, one-off incidents, low impact on wellbeing or work
- 2 (Medium): Recurring issues, moderate impact on wellbeing or productivity, potential policy breaches
- 3 (High): Serious misconduct, safety risks, legal exposure, significant harm to wellbeing`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 350,
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error.message);
    const content = json.choices[0].message.content;
    if (!content) throw new Error("Response is empty");
    const parsed = JSON.parse(content);
    if (!parsed.description || ![1, 2, 3].includes(parsed.riskLevel)) throw new Error("Invalid response structure");
    return { description: parsed.description, riskLevel: parsed.riskLevel };
  } catch (error) {
    console.error(error);
    return {};
  }
}
