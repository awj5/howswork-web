"use server";

export async function generateDescription(text: string, type: string) {
  try {
    const systemPrompt =
      type === "concern"
        ? `You are a workplace risk advisor for HowsWork, a psychosocial risk management platform.

Summarise the following employee concern for a risk register entry and assess its risk level.

Return a JSON object with exactly two fields:
- "description": a one to two sentence summary of the concern
- "riskLevel": an integer, either 1 (Low), 2 (Medium), or 3 (High)

The description should be:
- Written in third person (e.g. "An employee reported..." not "I experienced...")
- One to two sentences maximum
- Focused on the psychosocial hazard and its workplace impact
- Free of any identifying details about the employee

Do not:
- Prefix the description with labels like "Reported risk:" or "Summary:"
- Interpret or classify the behaviour — just describe what was reported
- Include recommendations or suggested actions in the description

Risk level guidance:
- 1 (Low): Minor interpersonal friction, one-off incidents, low impact on work
- 2 (Medium): Recurring issues, moderate impact on productivity or psychological health, potential policy breaches
- 3 (High): Serious misconduct, safety risks, legal exposure, significant psychological harm`
        : `You are a workplace risk advisor for HowsWork, a psychosocial risk management platform.

The data shows issues raised by employees during a check-in, how many selected each issue, the percentage of respondents they represent, and may include team or attribution information where available.

Return a JSON object with exactly two fields:
- "description": a two to three sentence summary of the issues raised
- "riskLevel": an integer, either 1 (Low), 2 (Medium), or 3 (High)

The description should be:
- Written in third person (e.g. "Employees reported..." not "I experienced...")
- Two to three sentences maximum
- Focused on the most significant issues and their prevalence
- Reference the scale of the issue where relevant (e.g. "raised by a significant portion of respondents")
- Free of any identifying details

Do not:
- Prefix the description with labels like "Summary:" or "Check-in results:"
- Include exact counts or percentages in the description
- Include recommendations or suggested actions
- List every issue individually if there are many — focus on the most significant

Risk level guidance:
- 1 (Low): Minor or isolated issues, low prevalence, limited impact on work
- 2 (Medium): Recurring or moderate prevalence issues, impact on productivity or psychological health, potential policy concerns
- 3 (High): High prevalence issues, serious psychosocial hazards such as bullying or harassment present, significant psychological harm or legal exposure`;

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
    if (!response.ok) throw new Error(json.error?.message ?? `OpenAI error ${response.status}`);
    const result = json.choices[0].message.content;
    if (!result) throw new Error("Response is empty");
    const parsed = JSON.parse(result);
    if (!parsed.description || ![1, 2, 3].includes(parsed.riskLevel)) throw new Error("Invalid response structure");
    return { description: parsed.description, riskLevel: parsed.riskLevel };
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function anonymizeDetails(text: string, language: string) {
  try {
    const systemPrompt = `You are a workplace risk advisor for HowsWork, a psychosocial risk management platform.

Rewrite the employee's concern so the author cannot be identified, while preserving meaning, seriousness, and facts.
The rewritten text must remain in the first person (I, me, my).

Rules:
- Remove ALL identifying details about the author/reporter:
  * Physical characteristics (accent, appearance, disability, age indicators)
  * Personal background (tenure, education, previous roles, family situation, cultural background)
  * Writing style quirks (unique phrases, humor, excessive punctuation, capitalization, slang)
  * Overly specific dates/times (use "recently", "over several months", "repeatedly" instead)
  * Specific locations beyond necessary context
  * Unique or rare situations that could identify the author
  * Gender markers if not essential to the concern
  * Any protected characteristics that could identify the reporter
- Preserve exactly:
  * Names, roles, departments of people being reported
  * The specific behavior or comments made by others
  * What the behavior targeted (e.g., "comments about my accent" → "discriminatory comments")
  * The impact, frequency, and severity
  * Timeline duration in general terms (months, weeks)
- Reframe identifying traits as behavior types:
  * "comments about my accent" → "discriminatory comments about how I speak"
  * "because I'm pregnant" → "discriminatory treatment related to my situation"
  * "jokes about my age" → "age-related harassment"
- Use neutral, plain, professional ${language}
- Match the original's level of seriousness (don't downplay urgent concerns)
- Remove emotional punctuation (!!!, ???) but preserve the seriousness
- Do not add interpretation, speculation, or softening language
- Do not mention the anonymization process itself

Output only the rewritten concern, nothing else.`;

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
    if (!response.ok) throw new Error(json.error?.message ?? `OpenAI error ${response.status}`);
    const result = json.choices[0].message.content;
    if (!result) throw new Error("Response is empty");
    return result;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
