import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: 'sk-proj-OoG1HEbTCI-...' });

export async function synthesizeSpeech(text) {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text
  });

  return Buffer.from(await mp3.arrayBuffer());
}
