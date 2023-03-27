require("dotenv").config();
const express = require("express");
const cors = require('cors');
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_KEY;
const client = yelp.client(apiKey);
const PORT = process.env.PORT || 3001;
const app = express();
//cors establishes connection between front and backend
app.use(cors());
app.use(express.json());
app.post('/message', (req, res) => {
    console.log(req.body);
    res.json({ message: "Hello from backend!" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// client.search({
//   term: 'ramen',
//   location: '37.786882,-122.399972',
//   radius: 1000,
//   limit: 50
// }).then(response => {
//   response.jsonBody.businesses.forEach(element => {
//     console.log(element);
//   });
// }).catch(err => {
//   console.log(err);
// });