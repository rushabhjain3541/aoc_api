module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        first_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        password: { type: String, default: '' },
        position: { type: String, default: '' },
        picture: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const AocEmsStaffs = mongoose.model("aoc_ems_staffs", schema);
  
    return AocEmsStaffs;
  };