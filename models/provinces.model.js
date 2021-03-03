module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        zone: { type: Number, default: 0 },
        code: { type: Number, default: 0 },
        name1: { type: String, default: '' },
        name2: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const Provinces = mongoose.model("provinces", schema);
    return Provinces;
  };