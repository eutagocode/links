import express from "express";
import {
    redirectPage,
    createLink,
    allLinks,
    deleteLink,
    editLink,
    loadLink,
} from "../controllers/linkcontrol.js";
const router = express.Router();

router.get("/", allLinks);

router.get("/add", (req, res) => {
    res.render("add", { error: false, body: {} });
});

router.get("/:title", express.json(), redirectPage);

router.post("/", express.urlencoded({ extended: true }), createLink);

router.get("/edit/:id", express.json(), loadLink);

router.put("/edit", express.urlencoded({ extended: true }), editLink);

router.delete("/:id", deleteLink);

router.delete("/", express.json(), deleteLink);

export default router;
