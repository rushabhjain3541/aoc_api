const db = require("../config/db.config");
const Drivers = db.drivers;

exports.getDriversList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getDriversListCondition = [
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
    
    Drivers.aggregate(getDriversListCondition)
    .then(count => {
        getDriversListCondition.splice(-1,1);
        getDriversListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getDriversListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getDriversListCondition.push({ "$limit": Number(pageSize) });
        Drivers.aggregate(getDriversListCondition)
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
            err.message || "Some error occurred while retrieving Drivers."
        });
    });
};