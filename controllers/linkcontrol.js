import Link from "../models/Link.js";

const redirectPage = async (req, res, next) => {
    const title = req.params.title;
    try {
        const doc = await Link.updateOne({ title }, { $inc: { click: 1 } });
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
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
        res.render("add", { error, body: req.body });
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

const editLink = async (req, res) => {
    let id = req.body.id;

    let link = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
    };

    try {
        await Link.updateOne({ _id: id }, link);
        res.json({ redirect: "/" });
    } catch (error) {
        res.render("edit", { error, body: req.body });
    }
};

const loadLink = async (req, res) => {
    let id = req.params.id;

    try {
        const doc = await Link.findById(id);
        res.render("edit", { error: false, body: doc });
    } catch (error) {
        res.status(404).send(error);
    }
};

export { redirectPage, createLink, allLinks, deleteLink, editLink, loadLink };
