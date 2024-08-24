require('dotenv').config();
const express = require('express');
const cors = require('cors');
let  bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;


const parser = bodyParser.urlencoded({extended:false});

app.use(parser);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', function(req, res) {  
  const url = req.body.url;
  const urlRegexPattern = /^https?:\/\/(www\.)?[\w-]+\.\w{2,5}/;
  if(!urlRegexPattern.test(url)){
    res.json({error: 'invalid url'});
  }else{
    const shortUrlNumber = Math.floor(Math.random() * 10000).toString();
    res.json({original_url: url, short_url: shortUrlNumber});
  }
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
