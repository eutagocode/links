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
    const link = new Link(req.body);

    try {
        await link.save();
        res.send("Link criado com sucesso");
    } catch (error) {
        res.render("index", { error, body: req.body });
    }
};

const allLinks = async (req, res) => {
    try {
        let links = await Link.find({});
        res.render("all", { links });
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
        res.send(await Link.deleteOne({ _id: id }));
    } catch (error) {
        res.send(error);
    }
};

export { redirect, createLink, allLinks, deleteLink };
