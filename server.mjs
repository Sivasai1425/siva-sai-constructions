import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 8787;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'siva-sai-ai-plan' }));

app.post('/api/generate-plan', async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
    const { prompt } = req.body || {};
    if (typeof prompt !== 'string' || prompt.trim().length < 50) return res.status(400).json({ error: 'A complete architectural prompt is required.' });
    if (prompt.length > 20000) return res.status(400).json({ error: 'Prompt is too long.' });

    const result = await openai.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
      prompt,
      size: process.env.OPENAI_IMAGE_SIZE || '1536x1024',
      quality: process.env.OPENAI_IMAGE_QUALITY || 'high',
      output_format: 'png'
    });

    const b64 = result?.data?.[0]?.b64_json;
    if (!b64) return res.status(502).json({ error: 'Image service returned no image data.' });
    res.json({ image: `data:image/png;base64,${b64}`, model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || 'Image generation failed.' });
  }
});

app.listen(port, () => console.log(`Siva Sai AI backend listening on :${port}`));
