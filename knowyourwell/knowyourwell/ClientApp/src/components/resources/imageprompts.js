const imagePrompts = [
  {
    type: "dropdownentry",
    options: ["Well Owner Consent Form", "Image Release Consent Form", "Well Head", "Nearest Surface Water", "Nearest Cropland", "Nearest Barnyard or Pasture", "Nearest Septic System", "Uncategorized Item"],
    fieldTitle: "Choose the type of image you want to upload:",
    value: "type",
    id: "im_type",
    required: true,
  },
  {
    type: "shorttextentry",
    fieldTitle: "Data Collector's Name:",
    value: "name",
    id: "im_name",
    required: true,
  },
  {
    type: "longtextentry",
    fieldTitle: "Observations",
    value: "observations",
    id: "im_observations",
    maxLength: "150",
    required: false,
  },
];

export default imagePrompts;
