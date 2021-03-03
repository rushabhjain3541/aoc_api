const db = require("../config/db.config");
const AocErStaffs = db.aoc_er_staffs;

exports.getAocErStaffsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getAocErStaffsListCondition = [
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
    
    AocErStaffs.aggregate(getAocErStaffsListCondition)
    .then(count => {
        getAocErStaffsListCondition.splice(-1,1);
        getAocErStaffsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getAocErStaffsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getAocErStaffsListCondition.push({ "$limit": Number(pageSize) });
        AocErStaffs.aggregate(getAocErStaffsListCondition)
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
            err.message || "Some error occurred while retrieving AocErStaffs."
        });
    });
};