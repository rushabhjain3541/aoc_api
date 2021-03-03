const db = require("../config/db.config");
const AocEmsStaffs = db.aoc_ems_staffs;

exports.getAocEmsStaffsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getAocEmsStaffsListCondition = [
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
    
    AocEmsStaffs.aggregate(getAocEmsStaffsListCondition)
    .then(count => {
        getAocEmsStaffsListCondition.splice(-1,1);
        getAocEmsStaffsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getAocEmsStaffsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getAocEmsStaffsListCondition.push({ "$limit": Number(pageSize) });
        AocEmsStaffs.aggregate(getAocEmsStaffsListCondition)
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
            err.message || "Some error occurred while retrieving AocEmsStaffs."
        });
    });
};