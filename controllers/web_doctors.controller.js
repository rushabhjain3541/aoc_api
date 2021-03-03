const db = require("../config/db.config");
const Doctors = db.doctors;

exports.getDoctorsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getDoctorsListCondition = [
        {
            '$match': {
                "$and": [
                    { "isactive": 1 },
                    { "isdeleted": false },
                    {
                        '$or': [
                            { doctor_name: { $regex: String(req.body.searchValue), $options: 'i' } },
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
    
    Doctors.aggregate(getDoctorsListCondition)
    .then(count => {
        getDoctorsListCondition.splice(-1,1);
        getDoctorsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getDoctorsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getDoctorsListCondition.push({ "$limit": Number(pageSize) });
        Doctors.aggregate(getDoctorsListCondition)
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
            err.message || "Some error occurred while retrieving Doctors."
        });
    });
};