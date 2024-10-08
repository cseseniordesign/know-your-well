const fieldPrompts = [
  {
    type: "longtextentry",
    fieldTitle:
      "Conditions: Describe weather, temperature, or anything note-worthy about your well",
    value: "conditions",
    id: "conditions",
  },
  {
    type: "dropdownentry",
    options: ["Intact", "Observable Opening", "Damaged"],
    fieldTitle: "Condition of the well cover",
    value: "wellcover",
    id: "wellcover",
    required: true,
  },
  {
    dependsOn: "wellcover",
    conditions: ["Observable Opening", "Damaged"],
    type: "longtextentry",
    fieldTitle: "Well Cover Description",
    value: "wellcoverdescription",
    id: "wellcoverdescription",
  },
  {
    type: "dropdownentry",
    fieldTitle: "Topography of the well location:",
    id: "topography",
    options: ["Hill Top", "Hill Slope", "Level Land", "Depression"],
    value: "topography",
    required: true,
  },
  {
    type: "dropdownentry",
    fieldTitle:
      "Is there evidence of surface run-off at the entry to the well?",
    value: "evidence",
    id: "evidence",
    options: ["Yes", "No"],
    required: true,
  },
  {
    type: "dropdownentry",
    fieldTitle:
      "Is there evidence of pooling or puddles within 12 ft of the well?",
    value: "pooling",
    id: "pooling",
    options: ["Yes", "No"],
    required: true,
  },
  {
    type: "numberentry",
    fieldTitle: "Groundwater Temperature",
    value: "temp",
    id: "temp",
    min: "0",
    max: "100",
    label: "Degrees Celsius",
    required: true,
  },
  {
    type: "numberentry",
    fieldTitle: "ph",
    value: "ph",
    id: "ph",
    min: "0",
    max: "14",
    label: "",
    required: true,
  },
  {
    type: "numberentry",
    fieldTitle: "Conductivity",
    value: "conductivity",
    id: "conductivity",
    min: "100",
    max: "2000",
    label: "uS/cm",
    required: true,
  },
  {
    type: "shorttextentry",
    fieldTitle: "Data Collector's Name:",
    value: "name",
    id: "name",
    required: true,
  },
  {
    type: "longtextentry",
    fieldTitle: "Observations",
    value: "observations",
    id: "observations",
    maxLength: "150",
    required: false,
  },
];

export default fieldPrompts;
