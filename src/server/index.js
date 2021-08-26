const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
// const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require("body-parser");
var cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

// console.log(JSON.stringify(mockAPIResponse))
// console.log(__dirname)

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Listening on port 8081!");
});

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.API_KEY;

app.post("/add", async (req, res) => {
  let url = req.body.url;
  axios
    .post(`${baseURL}?key=${API_KEY}&url=${url}&lang=en`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      let data = {
        polarity: response.data.score_tag,
        agreement: response.data.agreement,
        subjectivity: response.data.subjectivity,
        confidence: response.data.confidence,
        irony: response.data.irony,
      };
      res.send(data);
      console.log("response:", data);
    })
    .catch(function (error) {
      console.log("error", error);
    });
});
