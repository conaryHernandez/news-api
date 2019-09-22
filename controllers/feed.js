const { validationResult } = require('express-validator');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: 1,
            title: 'Post 1',
            content: 'This is the first post',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Conary'
            },
            createdAt: new Date()
        }],
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered date is incorrect');

        error.statusCode = 422;

        throw error;
    }
    const { title, content } = req.body;
    const post = new Post({
        title,
        content,
        imageUrl: 'images/stap.jpg',
        creator: {
            name: 'Conary'
        },
    });

    post.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Post created successfully',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};