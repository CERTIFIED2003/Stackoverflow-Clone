const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();

// Linkage with static files on frontend part
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));    
    } 
    catch (error) {
        res.send("Stackoverflow is not accessible right now! Check back soon");
    }
});
app.use("/upload", express.static(path.join(__dirname, "/../uploads")));

// Headers Cross Origin Resource Sharing
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Parsing
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
}));

// Declaring PORT
const PORT = process.env.PORT || 8080;

// Server startup
app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
});