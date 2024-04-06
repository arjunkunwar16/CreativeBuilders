const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 4000;
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.static('public'));

const geminiApiKey = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = googleAI.getGenerativeModel({ model: 'gemini-pro' });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// const test = async () => {
//     const result = await geminiModel.generateContent("Hello");
//     const tosend = result.response.text();
//     console.log(tosend);
//
// }
//
// test();

app.get('/generate', async (req, res) => {
  let prompt = req.query.prompt;
  prompt +=
    ' I want to make an architecture with these specifications, please give me exact coordinates of the objects required in the scene, also make the coordiantes positive integers, moreover unless mentioned assume the room to me 5m x 4 m note that give me the coordinates ONLY in the form of sofa:(x,y), chair(x,y) and so on note that dont give any other information other than the coordinates of the objects';
  prompt += ```
  Example is Sofa : (1,1), Chair : (2,2), Table : (3,3), Lamp : (4,4), Plant : (5,5)
  ```;
  const result = await geminiModel.generateContent(prompt);
  const tosend = result.response.text();
  // console.log(tosend);
  res.send(tosend);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
