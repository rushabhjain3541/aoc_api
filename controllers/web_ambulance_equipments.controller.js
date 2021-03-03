const db = require("../config/db.config");
const AmbulanceEquipments = db.ambulance_equipments;

exports.getAmbulanceEquipmentsList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getAmbulanceEquipmentsListCondition = [
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
    
    AmbulanceEquipments.aggregate(getAmbulanceEquipmentsListCondition)
    .then(count => {
        getAmbulanceEquipmentsListCondition.splice(-1,1);
        getAmbulanceEquipmentsListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getAmbulanceEquipmentsListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getAmbulanceEquipmentsListCondition.push({ "$limit": Number(pageSize) });
        AmbulanceEquipments.aggregate(getAmbulanceEquipmentsListCondition)
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
            err.message || "Some error occurred while retrieving AmbulanceEquipments."
        });
    });
};