import express from "express";
import {
    redirect,
    createLink,
    allLinks,
    deleteLink,
} from "../controllers/linkcontrol.js";
const router = express.Router();

router.get("/all", allLinks);

router.get("/:title", redirect);

router.post("/", express.urlencoded({ extended: true }), createLink);

router.delete("/:id", deleteLink);

router.delete("/", express.urlencoded({ extended: true }), deleteLink);

router.get("/", (req, res) => {
    res.render("index", { error: false, body: {} });
});

export default router;
