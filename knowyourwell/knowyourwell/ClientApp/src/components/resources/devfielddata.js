import moment from "moment";

const devFieldData = {
  conditions: "dev sample conditions",
  fa_latitude: "40.8420352",
  fa_longitude: "-96.6623232",
  temp: "50",
  ph: "7",
  conductivity: "101",
  name: "dev data collector",
  observations: "sample dev observations",
  wellcover: "Damaged",
  wellcoverdescription: "sample dev well cover description",
  topography: "Hill Slope",
  well_id: "dev123",
  dateentered: moment().format("L, h:mm a"),
  evidence: "Yes",
  pooling: "Yes",
};

export default devFieldData;
