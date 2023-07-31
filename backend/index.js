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
  // console.log("latitude: " + req.body.latitude);
  // console.log("longitude: " + req.body.longitude);
  
  (async()=>{
    // await search(req.body.latitude,req.body.longitude,"japanese chinese mexican",1000,20);
    let businesses = await search(req.body.latitude,req.body.longitude,"",1000,20,[1,2,3,4],true,"best_match");
    res.json({ businesses: businesses });
  })();
});
app.post("/search", (req, res) => {
  let prices = req.body.prices;
  for(let i=0; i<4;i++){
    if(prices[i] === "priceSelected"){
      prices[i] = i+1;
    }else if(prices[i] === "prices"){
      prices[i] = null;
    }
  }
  prices = prices.filter(Number);
  if(prices.length < 1){
    prices = [1,2,3,4];
  }
  let tags = req.body.tags;
  tags.forEach((tag)=>{
    (async()=>{
      let businesses = await search(req.body.latitude,req.body.longitude,tag,Math.ceil(req.body.size),10,prices,req.body.open,req.body.sortBy);
      businesses.forEach((business,num)=>{
        console.log(num+ ". " + business.name);
      })
    })();
  })
  res.json({body:req.body})
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
function search(latitude, longitude,search,radius,limit,price,open,sortBy) {
  return new Promise(resolve=>{
    client.search({
      term: `${search}`,
      location: `${latitude},${longitude}`,
      radius: `${radius}`,
      limit: `${limit}`,
      categories: "restaurants",
      price:`${price}`,
      open_now: `${open}`,
      sort_by: `${sortBy}`
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
