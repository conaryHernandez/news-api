const { validationResult } = require('express-validator');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {

    Post.find()
        .then(posts => {
            res
                .status(200)
                .json({
                    message: 'Post fetched',
                    posts,
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};

exports.getPost = (req, res, next) => {
    const { postId } = req.params;

    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('No post found.');

                error.statusCode = 404;

                throw error;
            }

            res
                .status(200)
                .json({
                    message: 'Post fetched',
                    post,
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered data is incorrect');

        error.statusCode = 422;

        throw error;
    }

    console.log('req', req.file);
    if (!req.file) {
        const error = new Error('No Image provided.');

        error.statusCode = 422;

        throw error;
    }

    const imageUrl = req.file.path.replace("\\" ,"/");
    imageUrl = req.file.path.replace("\\","/");
    // for mac const imageUrl = req.file.path;
    const { title, content } = req.body;
    const post = new Post({
        title,
        content,
        imageUrl,
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
