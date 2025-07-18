import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: 'sk-proj-OoG1HEbTCI-...' });

export async function askGPT(text) {
  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }]
  });
  return chat.choices[0].message.content;
}
