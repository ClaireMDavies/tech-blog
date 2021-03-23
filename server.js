const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000; 


app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, () => console.log('listening on port 3000'));