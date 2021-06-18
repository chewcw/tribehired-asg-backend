const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await req.context.models.User.find();

        if (users) {
            return res.status(200).send(users.map(user => (
                {
                    username: user.username,
                    email: user.email,
                }
            )));
        }
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get('/:username', async (req, res) => {
    try {
        const users = await req.context.models.User.find({
            username: req.params.username,
        });

        if (!users) {
            return res.status(404).send();
        }

        const user = {
            username: users[0].username,
            email: users[0].email,
        };
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
