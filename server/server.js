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

const test = async () => {
  const prompt = 'A room with Bed, Chair, Table, TV';
  const result = await geminiModel.generateContent(prompt);
  console.log(result.response.text());

}
// test();

app.get('/generate', async (req, res) => { 
  let prompt = 'I will now give you a prompt about description of a room with any number of Bed, Chair, Table, TV, you have to give me coordinates of the same assuming the room to be 5m x 5m. Now you have to give me the coordinates in the form ;Object1:(x1,y1);Object2:(x2,y2);Object3:(x3,y3);Object4:(x4,y4);. For example, if you want to place a Bed at (1,1), chair at (2,2), table at (3,3), TV at (4,4), you will give me the coordinates as ;TV:(1,1);Chair:(2,2);Table:(3,3);TV:(4,4); also keep in mind that the coordinates cant exceed 5 and cant be lesser than 1 as the room is 5mx5m otherwise the system will malfunction, also coordinates should be only integer nothing except it, moreover it is possible that you may not want to place all the objects in the room according to the prompt, in that case you can skip the object. Now let me give you the prompt, make sure to understand each and every word really clearly and then give me the coordinates according to the prompt someone needs. If you are outputing multiple object coordinates say tables, then you have to mark them like Table1, Table2, Table3, Table4.. same goes for other objects Also understand the basic positioning in a roomj that is TV should always be ahead of the bed, by ahead it is meant that either the x should be same or the y should be same of TV and the bed(unless specified otherwise) and chair should be always besides the table(unless specified otherwise), multiple beds can be placed side by side as thats how multiple bed rooms go Here is the prompt:';
  prompt += req.query.prompt;
  const result = await geminiModel.generateContent(prompt);
  const tosend = result.response.text();

  // create new coordinates object that map object to coordinate
  let coordinates = {};
  const objects = ['Chair', 'Table', 'TV', 'Bed', 'Chair1', 'Table1', 'TV1', 'Bed1', 'Chair2', 'Table2', 'TV2', 'Bed2', 'Chair3', 'Table3', 'TV3', 'Bed3', 'Chair4', 'Table4', 'TV4', 'Bed4', 'Chair5', 'Table5', 'TV5', 'Bed5'];

  tosend.split(';').forEach(line => { 
    const parts = line.split(':');
    const object = parts[0].trim();
    if (objects.includes(object)) {
      const coords = parts[1].trim().replace('(', '').replace(')', '').split(',');
      const x = parseInt(coords[0]);
      const y = parseInt(coords[1]);
      
      coordinates[object] = [x, y];
      
    }
  });

  console.log(coordinates);
  console.log(tosend);
  res.send(coordinates);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
