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

const geminiApiKey ='AIzaSyCBa97RninwHnX8sTPwxSL7a98BNVPTgFg';
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = googleAI.getGenerativeModel({ model: 'gemini-pro' });

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/generate', async (req, res) => {
   
    
  let prompt = '# Room Designer This prompt helps design a room layout by converting a simple description into coordinates. Predefined objects: TV, Plant, Sofa, Table, Chair, Bed. Please provide your room description. **Important: Follow the examples for proper formatting.** **Examples:** * "TV against the west wall, plant in the southeast corner." * "Sofa facing the TV in the center, table with two chairs to the right."  **Output Format:** ;Object1:(x1, y1);Object2:(x2,y2);... ';
  prompt += req.query.prompt;
  const result = await geminiModel.generateContent(prompt);
  const tosend = result.response.text();

  // create new coordinates object that map object to coordinate
  let coordinates = {};
  const objects = ['Sofa', 'Chair', 'Table', 'TV', 'Plant', 'Bed'];

  tosend.split(';').forEach(line => {
    const parts = line.split(':');
    const object = parts[0].trim();
    if (objects.includes(object)) {
      const coords = parts[1].trim().replace('(', '').replace(')', '').split(',');
      const x = parseFloat(coords[0]);
      const y = parseFloat(coords[1]);
      coordinates[object] = [x, y];
    }
  });

  console.log(coordinates);
  res.send(tosend);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
