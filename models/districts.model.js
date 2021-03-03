module.exports = mongoose => {
    var ObjectId = mongoose.Schema.Types.ObjectId;
    var schema = mongoose.Schema(
      {
        province_id: ObjectId,
        code: { type: String, default: '' },
        areacode: { type: String, default: '' },
        name1: { type: String, default: '' },
        name2: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false},
      },
      { timestamps: true }
    );

    const Districts = mongoose.model("districts", schema);
    return Districts;
  };