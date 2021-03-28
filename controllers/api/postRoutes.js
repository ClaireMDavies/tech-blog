const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


// create new post 
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//update post
router.put('/:id', async (req, res) => {

    try {
        const updatedPost = await Post.update({ 
            title: req.body.title, 
            post_content: req.body.post_content 
        }, 
        { 
            where: { id: req.params.id } 
        });

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//delete post (need to add in with auth, and session)
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;