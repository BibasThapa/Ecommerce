const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");




app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.get('/api/v1/payment/verify', (req, res) => {
  const { token, amount } = req.query;


 
  if (token && amount) {
   
    res.status(200).json({ success: true });
  } else {
   
    res.status(400).json({ error: 'Invalid payment verification data' });
  }
});




app.use(errorMiddleware);

module.exports = app;