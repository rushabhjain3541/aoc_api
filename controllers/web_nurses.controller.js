const db = require("../config/db.config");
const Nurses = db.nurses;

exports.getNursesList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getNursesListCondition = [
        {
            '$match': {
                "$and": [
                    { "isactive": 1 },
                    { "isdeleted": false },
                    {
                        '$or': [
                            { driver_name: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { last_name: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { email: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { phone: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    Nurses.aggregate(getNursesListCondition)
    .then(count => {
        getNursesListCondition.splice(-1,1);
        getNursesListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getNursesListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getNursesListCondition.push({ "$limit": Number(pageSize) });
        Nurses.aggregate(getNursesListCondition)
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
            err.message || "Some error occurred while retrieving Nurses."
        });
    });
};