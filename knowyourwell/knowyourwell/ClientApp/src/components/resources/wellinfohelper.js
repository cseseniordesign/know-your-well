const createWellInfoPayload = (wellInfo) => {
  // Define the fields and their corresponding transformations, if any
  const fieldsMap = {
    address: String,
    aquiferclass: String,
    aquifertype: String,
    boreholediameter: Number,
    city: String,
    county: String,
    datacollector: String,
    dateentered: String,
    email: String,
    estlatitude: Number,
    estlongitude: Number,
    installyear: (value) => JSON.stringify(value).substring(1, 5),
    landuse5yr: String,
    maintenance5yr: String,
    nrd: String,
    numberwelluser: Number,
    observation: String,
    pestmanure: String,
    phone: String,
    school_id: String,
    smelltaste: String,
    smelltastedescription: String,
    state: String,
    totaldepth: Number,
    wellwaterleveldepth: Number,
    wellcasematerial: String,
    wellcode: String,
    welldry: String,
    welldrydescription: String,
    wellname: String,
    wellowner: String,
    welltype: String,
    welluser: String,
    zipcode: String,
  };

  const payload = {};
  for (const key in wellInfo) {
    if (fieldsMap[key]) {
      payload[key] = fieldsMap[key](wellInfo[key]);
    } else {
      payload[key] = wellInfo[key];
    }
  }

  return payload;
};

export default createWellInfoPayload;
