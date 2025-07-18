import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI({ apiKey: 'sk-proj-OoG1HEbTCI-...' });

export async function transcribeAudio(filePath) {
  const resp = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-1'
  });
  return resp.text;
}
