const router = require('express').Router();
const { Comment } = require('../../models');

// create a comment against a post
router.post('/', async (req, res) => {

    try {
        const comment = await Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.postId,
            user_id: req.session.user_id
        });

        res.status(200).json(comment);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;