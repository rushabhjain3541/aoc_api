const db = require("../config/db.config");
const PatientSituations = db.patient_situations;

exports.getPatientSituationsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getPatientSituationsListCondition = [
        {
            '$match': {
                "$and": [
                    { "isactive": 1 },
                    { "isdeleted": false },
                    {
                        '$or': [
                            { situation: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { situation1: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    PatientSituations.aggregate(getPatientSituationsListCondition)
    .then(count => {
        getPatientSituationsListCondition.splice(-1,1);
        getPatientSituationsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getPatientSituationsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getPatientSituationsListCondition.push({ "$limit": Number(pageSize) });
        PatientSituations.aggregate(getPatientSituationsListCondition)
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
            err.message || "Some error occurred while retrieving PatientSituations."
        });
    });
};