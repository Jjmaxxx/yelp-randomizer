require("dotenv").config();
const express = require("express");
const cors = require("cors");
const yelp = require("yelp-fusion");
const apiKey = process.env.YELP_KEY;
const client = yelp.client(apiKey);
const PORT = process.env.PORT || 3001;
const app = express();
//cors establishes connection between front and backend
app.use(cors());
app.use(express.json());
app.post("/message", (req, res) => {
  console.log("latitude: " + req.body.latitude);
  console.log("longitude: " + req.body.longitude);
  (async()=>{
    let businesses = await search(req.body.latitude,req.body.longitude,"",1000,5);
    res.json({ businesses: businesses });
  })();
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
function search(latitude, longitude,search,radius,limit) {
  return new Promise(resolve=>{
    client.search({
      term: `${search}`,
      location: `${latitude},${longitude}`,
      radius: `${radius}`,
      limit: `${limit}`,
    })
    .then((response) => {
      // response.jsonBody.businesses.forEach((element) => {
      //   console.log(element);
      // });
      resolve(response.jsonBody.businesses);
    })
    .catch((err) => {
      console.log(err);
    });
  })
}
