import express from "express";

const port = 8080;
const app = express();

app.use("/", express.static("static"));

app.use("/", express.json());
app.listen(port, function () {

    console.log(`Listening on port ${port} – http://localhost:${port}`);
});



