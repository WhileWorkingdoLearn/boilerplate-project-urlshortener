require('dotenv').config();
const express = require('express');
const cors = require('cors');
let  bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;


const parser = bodyParser.urlencoded({extended:false});

const urlMap = new Map();

app.use(cors());

app.use(parser);

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl', function(req, res) {  
  console.log("post");
  const orgoUrl = req.body.url;
  const url = new URL(req.body.url).hostname;
  console.log("Url: " + url);
  dns.lookup(url, (err, address, family) => {
    if(err){
      console.log("Error: " +  'invalid url');
      res.json({error: 'invalid url'});
    } else {
      const shortUrl = Math.floor(Math.random() * 1000);
      urlMap.set(shortUrl, orgoUrl);
      console.log("ShortUrl: " + shortUrl);
      res.json({original_url: orgoUrl, short_url: shortUrl});
    }
  });
});


app.get('/api/shorturl/:shortUrl', function(req, res) {
  console.log("get");
  const shortUrl = parseInt(req.params.shortUrl,0);
  console.log("ShortUrl: " +shortUrl);
  console.log("Map has Url: " + urlMap.has(shortUrl));
  if(urlMap.has(shortUrl)){
    const url = urlMap.get(shortUrl);
    res.redirect(url);
  } else {
      res.json({error: 'invalid url'});
    }
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
