const imagePrompts = [
  {
    type: "dropdownentry",
    options: ["Well Owner Consent Form", "Image Release Consent Form", "Well Head", "Nearest Suface Water", "Nearest Cropland", "Nearest Barnyard or Pasture", "Nearest Septic System", "Uncategorized Item"],
    fieldTitle: "Choose the type of image you want to upload:",
    value: "type",
    id: "type",
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

export default imagePrompts;
