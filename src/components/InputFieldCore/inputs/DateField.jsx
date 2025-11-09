
import { useTranslation } from "react-i18next";
// import moment from "moment";
import { DatePicker } from "antd";
import React, { memo, useEffect, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday"; 
import localeData from "dayjs/plugin/localeData";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);


const DateField = (
  {
    value,
    handleChange,
    periodType,
    handleBlur,
    maxDate,
    minDate,
    maxDateMessage,
    minDateMessage,
    locale,
    variant,
    disabled,
    valueType
  },
  ...props
) => {
  const { t } = useTranslation();

  const switchFormat = (periodType) => {
    switch (periodType) {
      case "year":
        return "yyyy";
      default:
        return "dd/MM/yyyy";
    }
  };
const format="YYYY-MM-DD"

  const switchFormatMoment = (periodType) => {
    switch (periodType) {
      case "year":
        return "yyyy";
      default:
        return "yyyy-MM-DD";
    }
  };

  return (
      <DatePicker
        size="large"
        style={{ width: '100%' }}
        {...(periodType && {
          views: [periodType],
        })}
        disabled={disabled || false}
        id={"date-picker-inline-" + valueType}
        invalidDateMessage={value ? "Invalid Date Format" : ""}
        defaultValue={value && dayjs(value, format).isValid() ? dayjs(value, format) : null}
        minDate={minDate ? dayjs(minDate, format).isValid() ? dayjs(minDate, format) : null : null}
        maxDate={maxDate ? dayjs(maxDate, format).isValid() ? dayjs(maxDate, format) : null : null}
        format={format}
        onChange={(date,v) => {
          if (date) {
            handleChange(v);
            handleBlur && handleBlur(v);
          }
        }}
      />
  );
};

export default memo(DateField);


// import React, { useState } from "react";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
//   DatePicker,
// } from "@material-ui/pickers";
// import moment from "moment";

// // Date Picker
// import MomentUtils from "@date-io/moment";
// import "moment/locale/lo";
// import { useTranslation } from "react-i18next";

// const DateField = (
//   {
//     value,
//     handleChange,
//     periodType,
//     handleBlur,
//     maxDate,
//     minDate,
//     maxDateMessage,
//     minDateMessage,
//     locale,
//     variant,
//     disabled,
//   },
//   ...props
// ) => {
//   const { t } = useTranslation();
//   // const { disabled , ...other } = props;
//   let fieldValue = value;
//   console.log('fieldValue :>> ', disabled, props);

//   if (moment(value, "YYYY-MM-DD", true).isValid()) {
//     fieldValue = moment(value, "YYYY-MM-DD");
//   }

//   const switchFormat = (periodType) => {
//     switch (periodType) {
//       case "year":
//         return "yyyy";
//       default:
//         return "dd/MM/yyyy";
//     }
//   };

//   const switchFormatMoment = (periodType) => {
//     switch (periodType) {
//       case "year":
//         return "YYYY";
//       default:
//         return "YYYY-MM-DD";
//     }
//   };

//   return (
//     <MuiPickersUtilsProvider utils={MomentUtils} locale={locale || "en"}>
//       <DatePicker
//         clearable={false}
//         {...(periodType && {
//           views: [periodType],
//         })}
//         slotProps={{
//           textField: {
//             variant: "outlined"
//           }
//         }}
      
//         disabled={disabled || false}
//         value={value ? moment(fieldValue, switchFormatMoment(periodType)) : null}
//         defaultValue=""
//         onChange={(date) => {
//           handleChange(moment(date).format(switchFormatMoment(periodType)));
//           handleBlur &&
//             handleBlur(moment(date).format(switchFormatMoment(periodType)));
//         }}
//         format={switchFormatMoment(periodType)}
//         invalidDateMessage={value ? "Invalid Date Format" : ""}
//         maxDate={maxDate}
//         minDate={minDate}
//         maxDateMessage={maxDateMessage}
//         minDateMessage={minDateMessage}
//         clearLabel={React.createElement("span", null, t("clear"))}
//         cancelLabel={React.createElement("span", null, t("cancel"))}
//       />
//     </MuiPickersUtilsProvider>
//   );
// };

// export default DateField;

