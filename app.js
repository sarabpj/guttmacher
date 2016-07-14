const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
// app.d3 = require('d3')
// app.jsdom = require('jsdom')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'pug');
app.use(express.static(__dirname +'/public'));


app.use('/api', require('./routes/api'))

app.get('*', (req,res) => {
  res.send('Not a proper page');
});



app.listen(3000, () =>{
  console.log('Listing on port 3000');
});


