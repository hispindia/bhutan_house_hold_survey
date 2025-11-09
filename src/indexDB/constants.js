import moment from "moment";

export const LAST_DATE_OF_CURRENT_YEAR = moment()
  .endOf("year")
  .format("YYYY-MM-DD");
