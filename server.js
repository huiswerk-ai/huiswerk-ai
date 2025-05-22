const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// OpenAI configuratie (via environment variable)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/ai', async (req, res) => {
  const vraag = req.body.vraag;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Je bent een behulpzame huiswerkassistent voor jongeren. Geef duidelijke uitleg en oefenopgaven.' },
        { role: 'user', content: vraag }
      ],
    });

    const antwoord = completion.data.choices[0].message.content;
    res.json({ antwoord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI-verzoek mislukt' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});