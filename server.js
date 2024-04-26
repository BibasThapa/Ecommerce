const app = require("./app");


const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})


dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
cloudinary.config({
    cloud_name: "dtvnplhzl",
    api_key: "493681175876242",
    api_secret: "g7eOAKJI1wdamP9eNJwMfVfr6o0"
  });




const server= app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.port}`)
})
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console, log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    })
})