const { validationResult } = require('express-validator');

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
        return res.status(422).json({
            message: 'Validation Failed, entered date is incorrect',
            errors: errors.array()
        });
    }
    const { title, content } = req.body;

    res.status(201).json({
        message: 'Post created successfully',
        post: {
            _id: new Date().toISOString(),
            title,
            content,
            creator: {
                name: 'Conary'
            },
            createdAt: new Date()
        },
    });
};