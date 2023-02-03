const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors());

app.get("/test", (req, res) => {
    setTimeout(() => {
        res.send("response");
        console.log("request done")
    }, 5000);
    console.log("request received")
});

app.listen(8088, "0.0.0.0", () => {
    console.log("listening on port 8088");
});
