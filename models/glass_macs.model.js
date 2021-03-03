module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: { type: String, default: '' },
        mec_address: { type: String, default: '' },
        hospital_id: { type: String, default: '' },
        is_online: { type: String, default: '' },
        description: { type: String, default: '' },
        ambulance_id : { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false},
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
      },
      { timestamps: true }
    );

    const GlassMacs = mongoose.model("glass_macs", schema);
  
    return GlassMacs;
  };