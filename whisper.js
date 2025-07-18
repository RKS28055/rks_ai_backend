import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(filePath) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      response_format: "text",
      language: "en" // or "bn" for Bengali
    });
    return transcription;
  } catch (err) {
    console.error("🛑 Whisper error:", err);
    throw err;
  }
}
