module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        hospital_id: { type: String, default: '' },
        monitor_id: { type: String, default: '' },
        is_online: { type: String, default: '' },
        is_address: { type: String, default: '' },
        is_visible: { type: String, default: '' },
        name: { type: String, default: '' },
        web_address: { type: String, default: '' },
        ip: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const PatientMonitors = mongoose.model("patient_monitors", schema);
    return PatientMonitors;
  };