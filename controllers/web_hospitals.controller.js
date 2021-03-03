const db = require("../config/db.config");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const AocZones = db.aoc_zones;
const Hospitals = db.hospitals;
const SubDistricts = db.subdistricts;

exports.getHospitalList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getHospitalListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name1: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { name2: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { fullname: { $regex: String(req.body.searchValue), $options: 'i' } },
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    Hospitals.aggregate(getHospitalListCondition)
    .then(count => {
        getHospitalListCondition.splice(-1,1);
        getHospitalListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getHospitalListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getHospitalListCondition.push({ "$limit": Number(pageSize) });
        Hospitals.aggregate(getHospitalListCondition)
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

exports.updateHospitalDetail = (req, res) => {
    var response = {};

    if(req.body._id !== 'null'){
        var hospital = {
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            district_id: ObjectId(req.body.district_id),
            subdistrict_id: String(req.body.subdistrict_id),
            full_name: String(req.body.full_name),
            email: String(req.body.email),
            phone: String(req.body.phone),
            password: String(req.body.password),
            address: String(req.body.address),
            contact_address: String(req.body.contact_address),
            voip_number: String(req.body.voip_number),
            remark: String(req.body.remark),
            type: Number(req.body.type),
            organization_code: String(req.body.organization_code),
            hospital_area_type: String(req.body.hospital_area_type),
            zone: String(req.body.zone),
            isactive: String(req.body.isactive),
        }

        Hospitals.findOneAndUpdate({_id: req.body._id}, { $set: hospital })
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
        var hospital = new Hospitals({
            name1: String(req.body.name1),
            name2: String(req.body.name2),
            areacode: String(req.body.areacode),
            province_id: ObjectId(req.body.province_id),
            district_id: ObjectId(req.body.district_id),
            subdistrict_id: String(req.body.subdistrict_id),
            full_name: String(req.body.full_name),
            email: String(req.body.email),
            phone: String(req.body.phone),
            password: String(req.body.password),
            address: String(req.body.address),
            contact_address: String(req.body.contact_address),
            voip_number: String(req.body.voip_number),
            remark: String(req.body.remark),
            type: Number(req.body.type),
            organization_code: String(req.body.organization_code),
            hospital_area_type: String(req.body.hospital_area_type),
            zone: String(req.body.zone),
            isactive: String(req.body.isactive),
        })
        
        hospital
        .save(hospital)
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

};

exports.deleteHospital = (req, res) => {
    Hospitals.findOneAndUpdate({_id: req.body.hositalId}, { $set: {'isdeleted': true} })
    .then(data => {
        var response = {};
        response['data'] = data;
        response['success'] = 'true';
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the Hospital."
        });
    });
}

exports.getAllSubDistrictList = (req, res) => {
    var getSubDistrictListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    { "isactive": 1 },
                    { "district_id": { "$eq": ObjectId(req.body.districtId) }}
                ]
            }
        },
    ]
 
    SubDistricts.aggregate(getSubDistrictListCondition)
    .then(data => {
        var response = {};
        response['data'] = data;
        res.status(200).send(response);
    })
};

exports.getZoneList = (req, res) => {
    var currentPage = Number(req.body.currentPage);
    var pageSize = Number(req.body.pageSize);
    
    var getZoneListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    {
                        '$or': [
                            { name: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { check_name: { $regex: String(req.body.searchValue), $options: 'i' } },
                            { phone: { $regex: String(req.body.searchValue), $options: 'i' } }
                        ]
                    }
                ]
            }
        },
        { '$count': "count" }
    ]
    
    AocZones.aggregate(getZoneListCondition)
    .then(count => {
        getZoneListCondition.splice(-1,1);
        getZoneListCondition.push({ "$sort": JSON.parse(req.body.sortValue) });
        getZoneListCondition.push({ "$skip": Number((currentPage-1)*pageSize) });
        getZoneListCondition.push({ "$limit": Number(pageSize) });
        AocZones.aggregate(getZoneListCondition)
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
            err.message || "Some error occurred while retrieving Zones."
        });
    });
};

exports.getAllHospitalList = (req, res) => {
    var getSubDistrictListCondition = [
        {
            '$match': {
                "$and": [
                    { "isdeleted": false },
                    { "isactive": 1 },
                ]
            }
        },
    ]
 
    Hospitals.aggregate(getSubDistrictListCondition)
    .then(data => {
        var response = {};
        response['data'] = data;
        res.status(200).send(response);
    })
};

exports.updateZoneDetail = (req, res) => {
    var response = {};

    if(req.body._id !== 'null'){
        var aoc_zones = {
            name: String(req.body.name),
            check_name: String(req.body.check_name),
            hospital_id: ObjectId(req.body.hospital_id),
            phone: Number(req.body.phone),
            is_panel: Number(req.body.is_panel),
            isactive: Number(req.body.isactive)
        }

        AocZones.findOneAndUpdate({_id: req.body._id}, { $set: aoc_zones })
        .then(data => {
            response['data'] = data;
            response['success'] = 'true';
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while updating the Zone."
            });
        });
    }else{
        var aoc_zones = new AocZones({
            name: String(req.body.name),
            check_name: String(req.body.check_name),
            hospital_id: ObjectId(req.body.hospital_id),
            phone: Number(req.body.phone),
            is_panel: Number(req.body.is_panel),
            isactive: Number(req.body.isactive)
        })
        
        aoc_zones
        .save(aoc_zones)
        .then(data => {
            var response = {};
            response['success'] = 'true';
            response['data'] = data;
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Zone."
            });
        });
    }

};

exports.deleteZone = (req, res) => {
    AocZones.findOneAndUpdate({_id: req.body.zoneId}, { $set: {'isdeleted': true} })
    .then(data => {
        var response = {};
        response['data'] = data;
        response['success'] = 'true';
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting the Zone."
        });
    });
}