const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Create New Post
router.post('/', async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// List Posts
router.get('/all-posts', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if  (catName) {
            posts = await Post.find({ categories: {
                $in: [catName]
            }});
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts)            
    } catch (err) {
        res.status(500).json(err);
    }
});

// View Post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        !post && res.status(404).json('Post not found!')

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, 
                    {
                        $set: req.body
                    }, 
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err)
            }                
        } else {
            res.status(401).json('You do not have the right to UPDATE this Post!')
        }
    } catch (err) {
        res.status(500).json(err);
    }    
});

// Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                await post.delete()
                res.status(200).json('Post DELETED successfully!');
            } catch (err) {
                res.status(500).json(err)
            }                
        } else {
            res.status(401).json('You do not have the right to DELETE this Post!')
        }
    } catch (err) {
        res.status(500).json(err);
    }    
});

module.exports = router;