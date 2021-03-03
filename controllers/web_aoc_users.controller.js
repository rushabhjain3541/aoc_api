const db = require("../config/db.config");
const AocUsers = db.aoc_users;

exports.getAocUsersList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    console.log(req.body)
    var getAocUserListCondition = [
        {
            '$match': {
                "$and": [
                    { "isactive": 1 },
                    { "isdeleted": false },
                    {
                        '$or': [
                            { first_name: { $regex: String(req.body.searchValue), $options: 'i' } },
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
    
    AocUsers.aggregate(getAocUserListCondition)
    .then(count => {
        getAocUserListCondition.splice(-1,1);
        getAocUserListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getAocUserListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getAocUserListCondition.push({ "$limit": Number(pageSize) });
        AocUsers.aggregate(getAocUserListCondition)
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
            err.message || "Some error occurred while retrieving Aoc Users."
        });
    });
};