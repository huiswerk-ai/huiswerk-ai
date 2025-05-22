const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Zet hier je eigen OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Zet je API key in Render als environment variable
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const vraag = req.body.vraag;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Je bent een huiswerk-assistent die simpele uitleg geeft aan jongeren.' },
        { role: 'user', content: vraag }
      ],
    });

    const antwoord = completion.data.choices[0].message.content;
    res.json({ antwoord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Er ging iets mis met de AI' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});