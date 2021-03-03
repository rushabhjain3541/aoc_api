module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        driver_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        password: { type: String, default: '' },
        picture: { type: String, default: '' },
        isactive: { type: Number, default: 1 },
        isdeleted : {type: Boolean, default: false}
      },
      { timestamps: true }
    );

    const Drivers = mongoose.model("drivers", schema);
  
    return Drivers;
  };