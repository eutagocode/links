import express from "express";
import {
    redirectPage,
    createLink,
    allLinks,
    deleteLink,
    loadLink,
    editLink,
} from "../controllers/linkcontrol.js";
const router = express.Router();

router.get("/", allLinks);

router.get("/add", (req, res) => {
    res.render("index", { error: false, body: {} });
});

router.get("/edit/:id", loadLink);

router.get("/:title", redirectPage);

router.post("/", express.urlencoded({ extended: true }), createLink);

router.put("/edit/:id", express.urlencoded({ extended: true }), editLink);

router.delete("/:id", deleteLink);

router.delete("/", express.json(), deleteLink);

export default router;
