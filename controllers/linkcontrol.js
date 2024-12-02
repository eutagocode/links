import Link from "../models/Link.js";

const redirect = async (req, res) => {
    const title = req.params.title;
    try {
        const doc = await Link.findOne({ title });
        if (doc) {
            res.redirect(doc.url);
        } else {
            res.send("teste");
        }
    } catch (error) {
        res.send(error);
    }
};

const createLink = async (req, res) => {
    const doc = new Link(req.body);

    try {
        await doc.save();
        res.redirect("/");
    } catch (error) {
        res.render("index", { error, body: req.body });
    }
};

const allLinks = async (req, res) => {
    try {
        let docs = await Link.find({});
        res.render("all", { links: docs });
    } catch (error) {
        res.render(error);
    }
};

const deleteLink = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
        await Link.deleteOne({ _id: id });
        res.send(id);
    } catch (error) {
        res.status(404).send(error);
    }
};

const loadLink = async (req, res) => {
    let id = req.params.id;

    try {
        const doc = await Link.findById(id);
        res.render("edit", { body: doc });
    } catch (error) {
        res.status(404).send(error);
    }
};

const editLink = async (req, res) => {
    let doc = {};
    doc.title = req.body.title;
    doc.description = req.body.description;
    doc.url = req.body.url;
    let id = req.params.id;

    if (!id) {
        id = req.body.id;
    }

    try {
        const doc = await Link.findByIdAndUpdate(id);
        res.redirect("/");
    } catch (error) {
        res.render("edit", { error, body: req.body });
    }
};

export { redirect, createLink, allLinks, deleteLink, loadLink, editLink };
