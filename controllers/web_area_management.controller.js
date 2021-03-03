const db = require("../config/db.config");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Provinces = db.provinces;
const Districts = db.districts;
const SubDistricts = db.subdistricts;

exports.getProvinceList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);

    var getProvinceListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name1: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { name2: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    Provinces.aggregate(getProvinceListCondition)
    .then(count => {
        getProvinceListCondition.splice(-1,1);
        getProvinceListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getProvinceListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getProvinceListCondition.push({ "$limit": Number(pageSize) });
        Provinces.aggregate(getProvinceListCondition)
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
            err.message || "Some error occurred while retrieving Provinces."
        });
    });
};

exports.updateProvinceDetail = (req, res) => {
    var response = {};

    if(req.body._id !== null){
        var province = {
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            zone: String(req.body.zone),
            isactive: Number(req.body.isactive)
        }

        Provinces.findOneAndUpdate({_id: req.body._id}, { $set: province })
        .then(data => {
            response['data'] = data;
            response['success'] = 'true';
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while updating the Province."
            });
        });
    }else{
        var province = new Provinces({
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            zone: String(req.body.zone),
            isactive: Number(req.body.isactive)
        })
        
        province
        .save(province)
        .then(data => {
            var response = {};
            response['success'] = 'true';
            response['data'] = data;
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Province."
            });
        });
    }

}

exports.deleteProvince = (req, res) => {
    Provinces.findOneAndUpdate({_id: req.body.provinceId}, { $set: {'isdeleted': true} })
    .then(data => {
        var response = {};
        response['data'] = data;
        response['success'] = 'true';
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the Province."
        });
    });
}

exports.getDistrictList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getDistrictListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name1: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { name2: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    Districts.aggregate(getDistrictListCondition)
    .then(count => {
        getDistrictListCondition.splice(-1,1);
        getDistrictListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getDistrictListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getDistrictListCondition.push({ "$limit": Number(pageSize) });
        Districts.aggregate(getDistrictListCondition)
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
            err.message || "Some error occurred while retrieving Districts."
        });
    });
};

exports.getAllProvinceList = (req, res) => {
    var getProvinceListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    { "isactive": 1 },
                ]
            }
        },
    ]
 
    Provinces.aggregate(getProvinceListCondition)
    .then(data => {
        var response = {};
        response['data'] = data;
        res.status(200).send(response);
    })
};

exports.updateDistrictDetail = (req, res) => {
    var response = {};
    
    if(req.body._id !== null){
        var district = {
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            isactive: Number(req.body.isactive)
        }

        Districts.findOneAndUpdate({_id: req.body._id}, { $set: district })
        .then(data => {
            response['data'] = data;
            response['success'] = 'true';
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while updating the District."
            });
        });
    }else{
        var district = new Districts({
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            isactive: Number(req.body.isactive)
        })
        
        district
        .save(district)
        .then(data => {
            var response = {};
            response['success'] = 'true';
            response['data'] = data;
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the District."
            });
        });
    }

}

exports.deleteDistrict = (req, res) => {
    Districts.findOneAndUpdate({_id: req.body.districtId}, { $set: {'isdeleted': true} })
    .then(data => {
        var response = {};
        response['data'] = data;
        response['success'] = 'true';
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the District."
        });
    });
}

exports.getSubDistrictList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getSubDistrictListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name1: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { name2: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    SubDistricts.aggregate(getSubDistrictListCondition)
    .then(count => {
        getSubDistrictListCondition.splice(-1,1);
        getSubDistrictListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getSubDistrictListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getSubDistrictListCondition.push({ "$limit": Number(pageSize) });
        SubDistricts.aggregate(getSubDistrictListCondition)
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
            err.message || "Some error occurred while retrieving SubDistricts."
        });
    });
};

exports.getAllDistrictList = (req, res) => {
    var getDistrictListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    { "isactive": 1 },
                    { "province_id": { "$eq": ObjectId(req.body.provinceId) }}
                ]
            }
        },
    ]
 
    Districts.aggregate(getDistrictListCondition)
    .then(data => {
        var response = {};
        response['data'] = data;
        res.status(200).send(response);
    })
};

exports.updateSubDistrictDetail = (req, res) => {
    var response = {};
    
    if(req.body._id !== null){
        var subdistrict = {
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            district_id: ObjectId(req.body.district_id),
            isactive: Number(req.body.isactive)
        }

        SubDistricts.findOneAndUpdate({_id: req.body._id}, { $set: subdistrict })
        .then(data => {
            response['data'] = data;
            response['success'] = 'true';
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while updating the Sub-District."
            });
        });
    }else{
        var subdistrict = new Districts({
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            district_id: ObjectId(req.body.district_id),
            isactive: Number(req.body.isactive)
        })
        
        subdistrict
        .save(subdistrict)
        .then(data => {
            var response = {};
            response['success'] = 'true';
            response['data'] = data;
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Sub-District."
            });
        });
    }

}

exports.deleteSubDistrict = (req, res) => {
    SubDistricts.findOneAndUpdate({_id: req.body.subDistrictId}, { $set: {'isdeleted': true} })
    .then(data => {
        var response = {};
        response['data'] = data;
        response['success'] = 'true';
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the Sub-District."
        });
    });
}