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
   
    
  let prompt = ' there is a prompt which will contain what the user wants in a room,also unless mentioned assume the room to be 5m x 4m dimentions now from that prompt you have to infer the objects and its possible placements in a room into a coordinates . Make all the generic assumntions about the room and the stuff. Only include Sofa, chair, table, Tv, plant and bed nothing else in the response. Example is Sofa : (x1,y1); Chair : (x2,y2); Table : (x3,y3); TV : (x4,y4); Plant : (x5,y5);Bed:(x6, y6) where x1..x6 and y1..y6 are the coordinates of the scene according to the prompt. Also assume that objects are not rotated and they are placed in the same direction as they are in the prompt.  Now the prompt in question is ->> ';
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
