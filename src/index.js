const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connection = require('./models/db');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
// app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());

//routes
app.use('/', require('./routes/index'));

//starting the server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});