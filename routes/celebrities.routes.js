const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res) => {
    try{
        const celebrityList = await Celebrity.find();
        res.render("./celebrities/celebrities.hbs", { celebrityList: celebrityList });
    }
    catch (error) {
        console.log(err);
    }
  });

router.get("/create", (req, res) => {
    res.render("./celebrities/new-celebrity.hbs");
  });

router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
        res.redirect('/celebrities');
    })
    .catch((err) => {
        res.render("./celebrities/new-celebrity.hbs");
    })
})

module.exports = router;