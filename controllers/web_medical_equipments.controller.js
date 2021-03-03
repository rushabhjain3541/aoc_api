const db = require("../config/db.config");
const MedicalEquipments = db.medical_equipments;

exports.getMedicalEquipmentsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getMedicalEquipmentsListCondition = [
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
    
    MedicalEquipments.aggregate(getMedicalEquipmentsListCondition)
    .then(count => {
        getMedicalEquipmentsListCondition.splice(-1,1);
        getMedicalEquipmentsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getMedicalEquipmentsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getMedicalEquipmentsListCondition.push({ "$limit": Number(pageSize) });
        MedicalEquipments.aggregate(getMedicalEquipmentsListCondition)
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
            err.message || "Some error occurred while retrieving MedicalEquipments."
        });
    });
};