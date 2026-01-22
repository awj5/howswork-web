"use server";

export async function anonymizeDetails(text: string, language: string) {
  try {
    const systemPrompt = `
You are an anonymisation assistant for HowsWork.

Rewrite the employee's concern so the author cannot be identified, while preserving meaning, seriousness, and facts.
The rewritten text must remain in the first person (I, me, my).

Rules:
- Remove identifying details about the author (writing style, personal background, overly specific dates/times/locations, unique situations).
- Preserve people involved (names/roles/departments) and what happened.
- Use neutral, plain, professional ${language}.
- Do not add, speculate, soften, or mention anonymisation.

Output only the rewritten concern.
    `.trim();

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
        max_tokens: 700,
        temperature: 0.2,
      }),
    });

    const json = await response.json();
    if (!response.ok) throw new Error(json.error.message);
    const newText = json.choices[0].message.content;
    if (!newText) throw new Error("Response is empty");
    return newText;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
