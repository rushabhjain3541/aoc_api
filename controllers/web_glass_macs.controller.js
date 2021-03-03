const db = require("../config/db.config");
const GlassMacs = db.glass_macs;

exports.getGlassMacsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getGlassMacsListCondition = [
        {
            '$match': {
                "$and": [
                    { "isactive": 1 },
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    GlassMacs.aggregate(getGlassMacsListCondition)
    .then(count => {
        getGlassMacsListCondition.splice(-1,1);
        getGlassMacsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getGlassMacsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getGlassMacsListCondition.push({ "$limit": Number(pageSize) });
        GlassMacs.aggregate(getGlassMacsListCondition)
        .then(data => {
            var response = {};
            response['count'] = (count[0])?count[0].count:0;
            response['data'] = data;
            res.status(200).send(response);
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving GlassMacs."
        });
    });
};