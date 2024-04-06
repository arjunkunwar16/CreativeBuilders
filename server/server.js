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
   
    
  let prompt = 'I will now give you a prompt about description of a room with Sofa, Chair, Table, TV, Plant and Bed, you have to give me coordinates of the same assuming the room to be 5m x 4m. Now you have to give me the coordinates in the form ;Object1:(x1,y1);Object2:(x2,y2);Object3:(x3,y3);Object4:(x4,y4);Object5:(x5,y5);Object6:(x6,y6);. For example, if you want to place a sofa at (1,1), chair at (2,2), table at (3,3), TV at (4,4), plant at (5,5) and bed at (6,6), you will give me the coordinates as ;Sofa:(1,1);Chair:(2,2);Table:(3,3);TV:(4,4);Plant:(5,5);Bed:(6,6); moreover it is possible that you may not want to place all the objects in the room, in that case you can skip the object.';
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
