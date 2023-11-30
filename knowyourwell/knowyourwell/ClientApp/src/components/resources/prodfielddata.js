import moment from "moment";

const prodFieldData = {
    well_id: "",
    fa_latitude: "",
    fa_longitude: "",
    conditions: "",
    temp: "",
    ph: "",
    conductivity: "",
    name: "",
    observation: "",
    wellcover: "",
    wellcoverdescription: "",
    topography: "",
    dateentered: moment().format('L, h:mm a'),
    evidence: "",
    pooling: "",
};

export default prodFieldData;