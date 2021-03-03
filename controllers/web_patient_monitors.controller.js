const db = require("../config/db.config");
const PatientMonitors = db.patient_monitors;

exports.getPatientMonitorsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getPatientMonitorsListCondition = [
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
    
    PatientMonitors.aggregate(getPatientMonitorsListCondition)
    .then(count => {
        getPatientMonitorsListCondition.splice(-1,1);
        getPatientMonitorsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getPatientMonitorsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getPatientMonitorsListCondition.push({ "$limit": Number(pageSize) });
        PatientMonitors.aggregate(getPatientMonitorsListCondition)
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
            err.message || "Some error occurred while retrieving PatientMonitors."
        });
    });
};