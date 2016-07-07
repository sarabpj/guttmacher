const express = require('express');
const app = express();
const bodyParser = require ('body-parser');


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api', require('./routes/api'))

app.get('*', (req,res) => {
  res.send('Not a proper page');
});



app.listen(3000, () =>{
  console.log('Listing on port 3000');
});


