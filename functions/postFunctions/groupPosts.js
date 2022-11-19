const Post = require('../../schema/post');

module.exports = (req, res) => {
    Post.aggregate(
        [
            {$match: {}},
            {$group: {_id: ["$brand", "$productname"], post_id: {$addToSet: "$_id"}, rating: {$avg: "$rating"}}},
            {$sort: {rating: -1}}
        ]
    )
    .then(posts => {
        res.json(posts);

    }).catch(error => {
        return res.status(400).json({
            success: false,
            error: error
        })
    })

};
