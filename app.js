import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;

const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 },
});

const Link = mongoose.model("Link", linkSchema);

const link = new Link({
    title: "Instagram",
    description: "Link para o instagram",
    url: "https://www.instagram.com/eutago/",
});

link.save()
    .then((doc) => {
        console.log(doc);
    })
    .catch((error) => {
        console.error(error);
    });

mongoose.connect("mongodb://localhost/newlinks");

const db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => console.log(db));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => console.log("Listening on port", PORT));
