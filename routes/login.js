const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    if (!req.body?.password || !req.body?.email) {
        return res.status(400).send('Invalid body payload provided');
    }

    try {
        const users = await req.context.models.User.find({
            email: req.body.email,
        });

        if (!users || users.length > 1) {
            return res.status(401).send();
        }

        const result = await bcrypt.compare(req.body.password, users[0].password);
        if (result) {
            return res.status(200).send();
        }
    } catch (err) {
        return res.status(401).send();
    }

    return res.status(401).send();
});

module.exports = router;
