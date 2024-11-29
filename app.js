import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost/newlinks");

const db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => console.log("Banco carregado!"));

const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 },
});

const Link = mongoose.model("Link", linkSchema);

app.get("/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const doc = await Link.findOne({ title });
        res.redirect(doc.url);
    } catch (error) {
        res.send(error);
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => console.log("Listening on port", PORT));
