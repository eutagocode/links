import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import linkRoute from "./routes/linkroute.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
app.use(cors());
mongoose.connect("mongodb://localhost/newlinks");

const db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => console.log("Banco carregado!"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use("/", linkRoute);

app.listen(PORT, () => console.log("Listening on port", PORT));
