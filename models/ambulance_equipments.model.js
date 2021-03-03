module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: { type: String, default: '' },
        picture: { type: String, default: '' },
        icon_image: { type: String, default: '' },
        remark: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const AmbulanceEquipments = mongoose.model("ambulance_equipments", schema);
  
    return AmbulanceEquipments;
  };