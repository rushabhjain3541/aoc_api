module.exports = mongoose => {
    var ObjectId = mongoose.Schema.Types.ObjectId;
    var schema = mongoose.Schema(
      {
        province_id: ObjectId,
        district_id: ObjectId,
        code: { type: String, default: '' },
        name1: { type: String, default: '',index:true },
        name2: { type: String, default: '' ,index:true},
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false},
      },
      { timestamps: true }
    );

    const SubDistricts = mongoose.model("subdistricts", schema);
    return SubDistricts;
  };