const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
// const fetch = require('node-fetch');
const axios = require('axios');


// var json = {
//     'title': 'message title',
//     'message': 'this is a message',
//     'time': 'time now'
// }

const app = express()
app.use(cors());
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('dist'))

// app.use(function (err, req, res, next) {
// 	console.error(err.stack);
// 	res.status(500).send("Something broke!");
// });

// console.log(mockAPIResponse)

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


// app.post("/add", (req, res) => {
// 	axios.post(`http://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&url=${req.body.url}&lang=en`).then((response) => {
// 		res.send(response.data);
// 		console.log(response.data);
// 	});
// });

app.post('/add', async (req, res) => {
  // let input = req.body.url
    axios.post(`${baseURL}?key=${API_KEY}&lang=auto&url=${req.body.url}`)
    .then(function (response) {
      // const data = response.json();
        res.send(response.data);
    console.log('response url:', response);
    })
    .catch (function (error) {
        console.log("error", error);
    })
});