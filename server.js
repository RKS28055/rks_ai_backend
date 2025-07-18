import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { transcribeAudio } from './utils/whisper.js';
import { askGPT } from './utils/gpt.js';
import { synthesizeSpeech } from './utils/tts.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post('/voice', upload.single('audio'), async (req, res) => {
  try {
    const path = req.file.path;
    const text = await transcribeAudio(path);
    console.log('📥 Voice to Text:', text);

    const reply = await askGPT(text);
    console.log('🤖 GPT Reply:', reply);

    const audioBuffer = await synthesizeSpeech(reply);
    fs.writeFileSync('reply.wav', audioBuffer);

    res.sendFile('reply.wav', { root: '.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing voice input.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 RKS AI Backend running at http://localhost:${PORT}`);
});
