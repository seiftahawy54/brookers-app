import Models from "../../models/index.js";

const getSearch = async (req, res, next) => {
    const {kw} = req.query;
    let {filter} = req.body;

    const query = [
        {
            $match: {
                title: {$regex: `^${kw}`},
                ...filter,
            },
        },
    ];

    let searchResult = await Models.Posts.aggregate(query);
    searchResult = await Models.Users.populate(searchResult, {
        path: "seller",
    })

    if (searchResult.length === 0) {
        return res.status(404).json([]);
    }

    res.status(200).json({searchResult});
};

export default {getSearch};
