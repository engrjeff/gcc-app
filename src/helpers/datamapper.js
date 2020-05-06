export const mapCellStatus = (cellStatus) => {
  switch (cellStatus) {
    case "1T":
      return "1st Timer";
    case "2T":
      return "2nd Timer";
    case "3T":
      return "3rd Timer";
    case "4T":
      return "4th Timer";
    case "R":
      return "Regular";
    default:
      return "";
  }
};

export const mapChurchStatus = (churchStatus) => {
  switch (churchStatus) {
    case "NACS":
      return "Not yet attended church";
    case "ACS":
      return "Attended church";
    case "CICS":
      return "Consistent in church";
    default:
      return "";
  }
};

export const parseDate = (date) => {
  return new Date(date).toLocaleDateString();
};
