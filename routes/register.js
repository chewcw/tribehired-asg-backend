const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    if (!req.body?.username || !req.body?.password || !req.body?.email) {
        return res.status(400).send('Invalid body payload provided');
    }

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        try {
            await req.context.models.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            return res.status(200).send();
        } catch (err) {
            return res.status(500).send('Error creating user');
        }
    });
});

module.exports = router;
