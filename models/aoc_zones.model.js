module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: { type: String, default: '' },
        check_name: { type: String, default: '' },
        hospital_id: { type: String, default: '' },
        phone: { type: String, default: '' },
        is_panel: { type: String, default: '' },
        created_by: { type: String, default: '' },
        updated_by: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const AocZones = mongoose.model("aoc_zones", schema);
  
    return AocZones;
  };