// import { Button, Col, Form, Row, Table, Tabs } from "antd";
// import { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import SideBarContainer from "@/containers/SideBar";
// import withDhis2FormItem from "@/hocs/withDhis2Field";
// import CFormControl from "../CustomAntForm/CFormControl";
// // import InputField from "../InputField";
// import useHouseholdSurveyForm from "@/hooks/useHouseholdSurveyForm";

// /* style */
// import "./index.css";
// import InputField from "../InputFieldCore/InputField.component";

// const CensusDetailForm = ({ onSubmit, selected6Month, onTabChange, values, }) => {

//   const dataElements = useSelector((state) => state.metadata.programMetadata.programStages[0].dataElements);
//   const Dhis2FormItem = useMemo(() => withDhis2FormItem(dataElements)(CFormControl), [dataElements]);

//   const { form, surveyList, loadServeyFields } = useHouseholdSurveyForm(values)

//   const { t } = useTranslation();

//   const columns = [
//     {
//       dataIndex: "label",
//       key: "label",
//       render: (value, row, index) => {
//         const { type, styles } = row;
//         return {
//           children: value,
//           props: {
//             colSpan: type === "title" ? 4 : 1,
//             style: styles,
//           },
//         };
//       },
//     },
//     {
//       dataIndex: "input1",
//       key: "input1",
//       render: (value, row, index) => {
//         return {
//           children: value,
//           props: {
//             colSpan: getInputRowSpan(row, true),
//           },
//         };
//       },
//     },
//     {
//       dataIndex: "input2",
//       key: "input2",
//       render: (value, row, index) => {
//         return {
//           children: value,
//           props: {
//             colSpan: getInputRowSpan(row),
//           },
//         };
//       },
//     },
//     {
//       dataIndex: "input3",
//       key: "input3",
//       render: (value, row, index) => {
//         return {
//           children: value,
//           props: {
//             colSpan: getInputRowSpan(row),
//           },
//         };
//       },
//     },
//   ];

//   const getInputRowSpan = (row, isFirstInput = false) => {
//     const { type, uid } = row;
//     return type === "title" ? 0 : uid ? (isFirstInput ? 3 : 0) : 1;
//   };

//   const sumOf = (target, fields) => {
//     return {
//       dependentFields: fields,
//       setValuesFunc: (values) => {
//         const sum = values.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
//         return {
//           [target]: sum,
//         };
//       },
//       childPropsFunc: ([]) => {
//         return {
//           disabled: true,
//         };
//       },
//     };
//   };

//   const dependenciesOf = (target) => {
//     return {
//       skFDIWZmgTC: {
//         dependentFields: ["skFDIWZmgTC"],
//         // showFieldFunc: ([skFDIWZmgTC]) => skFDIWZmgTC != 0,
//         setValuesFunc: ([skFDIWZmgTC]) => {
//           if (skFDIWZmgTC <= 0) {
//             return {
//               [target]: "",
//             };
//           }
//         },
//         childPropsFunc: ([skFDIWZmgTC]) => {
//           return {
//             disabled: skFDIWZmgTC <= 0,
//           };
//         },
//       },
//       ztDjhjZoEGe: {
//         dependentFields: ["ztDjhjZoEGe"],
//         // showFieldFunc: ([ztDjhjZoEGe]) => ztDjhjZoEGe != 0,
//         setValuesFunc: ([ztDjhjZoEGe]) => {
//           if (ztDjhjZoEGe <= 0) {
//             return {
//               [target]: "",
//             };
//           }
//         },
//         childPropsFunc: ([ztDjhjZoEGe]) => {
//           return {
//             disabled: ztDjhjZoEGe <= 0,
//           };
//         },
//       },
//       QteYoL0Yy6K: {
//         dependentFields: ["QteYoL0Yy6K"],
//         // setValuesFunc: ([QteYoL0Yy6K]) => {
//         //   if (QteYoL0Yy6K <= 0) {
//         //     return {
//         //       [target]: "",
//         //     };
//         //   }
//         // },
//         // childPropsFunc: ([QteYoL0Yy6K]) => {
//         //   return {
//         //     disabled: QteYoL0Yy6K <= 0,
//         //   };
//         // },
//       },
//     };
//   };

//   useEffect(() => { loadServeyFields() }, [])

//   const dataSource = surveyList.map((row, index) => {
//     const {
//       uid,
//       some,
//       alot,
//       thirdRowTitle,
//       thirdRowId,
//       name,
//       type,
//       hidden,
//       permanentHide,
//       dependentFields = [],
//       setValuesFunc = () => { },
//       showFieldFunc = () => true,
//       childPropsFunc = () => { },
//     } = row;
//     switch (type) {
//       case "title": {
//         return {
//           ...row,
//           key: index,
//           label: name,
//         };
//       }
//       default: {
//         if (uid) {
//           return {
//             ...row,
//             key: index,
//             label: name,
//             input1: (
//               <Dhis2FormItem
//                 noStyle
//                 id={uid}
//                 hidden={permanentHide == true ? true : hidden}
//                 dependentFields={dependentFields}
//                 setValuesFunc={setValuesFunc}
//                 showFieldFunc={showFieldFunc}
//                 childPropsFunc={childPropsFunc}

//               >
//                 <InputField
//                   size="small"
//                   hidden={permanentHide == true ? true : hidden}
//                   style={{ minWidth: '100%' }} />
//               </Dhis2FormItem>
//             ),
//           };
//         } else {
//           return {
//             ...row,
//             key: index,
//             label: name,
//             input1: (
//               <Dhis2FormItem
//                 hidden={hidden}
//                 displayFormName={t("some")} id={some}>
//                 <InputField
//                   hidden={permanentHide == true ? true : hidden}
//                   size="small" />
//               </Dhis2FormItem>
//             ),
//             input2: (
//               <Dhis2FormItem
//                 hidden={hidden}
//                 displayFormName={t("alot")} id={alot}>
//                 <InputField
//                   hidden={permanentHide == true ? true : hidden}
//                   size="small" />
//               </Dhis2FormItem>
//             ),
//             input3: (
//               <Dhis2FormItem
//                 hidden={hidden}
//                 displayFormName={t(thirdRowTitle)} id={thirdRowId}>
//                 <InputField
//                   hidden={permanentHide == true ? true : hidden}
//                   size="small" />
//               </Dhis2FormItem>
//             ),
//           };
//         }
//       }
//     }

//   });

//   const items = [
//     {
//       key: 1,
//       label: ``,
//       children: (

//         <Table
//           size="small"
//           bordered
//           pagination={false}
//           showHeader={false}
//           dataSource={dataSource}
//           columns={columns}
//         />
//       ),
//     }
//   ];

//   return (
//     <Form
//       onFieldsChange={loadServeyFields}
//       initialValues={values}
//       form={form}
//       onFinish={(fieldsValue) => {
//         onSubmit(fieldsValue);
//       }}
//     >
//       <div className="d-md-flex">
//         <Col className="leftBar mr-2 mt-2">
//           <SideBarContainer />

//           <Row justify="center">
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="mt-2"
//               style={{
//                 width: "100%",
//                 backgroundColor: "#4CAF50",
//               }}
//             >
//               {t("save")}
//             </Button>
//           </Row>
//         </Col>

//         <Col className="rightBar">
//           <Tabs
//             defaultActiveKey="1"
//             size="small"
//             items={items}
//             onChange={onTabChange}
//           />
//         </Col>
//       </div>
//     </Form>
//   );
// };

// export default CensusDetailForm;

import { Button, Col, Form, Row, Table, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SideBarContainer from "@/containers/SideBar";
import withDhis2FormItem from "@/hocs/withDhis2Field";
import CFormControl from "../CustomAntForm/CFormControl";
import InputField from "../InputField";
import useHouseholdSurveyForm from "@/hooks/useHouseholdSurveyForm";

/* style */
import "./index.css";
// import InputField from "../InputFieldCore/InputField.component";

const CensusDetailForm = ({
  onSubmit,
  selected6Month,
  onTabChange,
  values,
}) => {
  const dataElements = useSelector(
    (state) => state.metadata.programMetadata.programStages[0].dataElements
  );
  const Dhis2FormItem = useMemo(
    () => withDhis2FormItem(dataElements)(CFormControl),
    [dataElements]
  );

  const { form, surveyList, loadServeyFields } = useHouseholdSurveyForm(values);

  const { t } = useTranslation();
  const [formData, setFormData] = useState({});

  const columns = [
    {
      dataIndex: "label",
      key: "label",
      render: (value, row, index) => {
        const { type, styles } = row;
        return {
          children: value,
          props: {
            colSpan: type === "title" ? 4 : 1,
            style: styles,
          },
        };
      },
    },
    {
      dataIndex: "input1",
      key: "input1",
      render: (value, row, index) => {
        return {
          children: value,
          props: {
            colSpan: getInputRowSpan(row, true),
          },
        };
      },
    },
    {
      dataIndex: "input2",
      key: "input2",
      render: (value, row, index) => {
        return {
          children: value,
          props: {
            colSpan: getInputRowSpan(row),
          },
        };
      },
    },
    {
      dataIndex: "input3",
      key: "input3",
      render: (value, row, index) => {
        return {
          children: value,
          props: {
            colSpan: getInputRowSpan(row),
          },
        };
      },
    },
  ];

  const getInputRowSpan = (row, isFirstInput = false) => {
    const { type, uid } = row;
    return type === "title" ? 0 : uid ? (isFirstInput ? 3 : 0) : 1;
  };

  const handleFormData = (id, value) => {
    console.log("handleFormData:>>>", id, value);
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    loadServeyFields();
  }, []);

  const dataSource = surveyList.map((row, index) => {
    const {
      uid,
      some,
      alot,
      thirdRowTitle,
      thirdRowId,
      name,
      type,
      hidden,
      permanentHide,
      dependentFields = [],
      setValuesFunc = () => {},
      showFieldFunc = () => true,
      childPropsFunc = () => {},
    } = row;
    switch (type) {
      case "title": {
        return {
          ...row,
          key: index,
          label: name,
        };
      }
      default: {
        if (uid) {
          return {
            ...row,
            key: index,
            label: name,
            input1: (
              <Dhis2FormItem
                noStyle
                id={uid}
                value={formData[uid] || ""}
                hidden={permanentHide == true ? true : hidden}
                dependentFields={dependentFields}
                setValuesFunc={setValuesFunc}
                showFieldFunc={showFieldFunc}
                childPropsFunc={childPropsFunc}
              >
                <InputField size="small" style={{ minWidth: "100%" }} />
              </Dhis2FormItem>
            ),
          };
        } else {
          return {
            ...row,
            key: index,
            label: name,
            input1: (
              <Dhis2FormItem
                hidden={hidden}
                displayFormName={t("some")}
                id={some}
              >
                <InputField
                  value={formData[uid] || ""}
                  hidden={permanentHide == true ? true : hidden}
                  size="small"
                />
              </Dhis2FormItem>
            ),
            input2: (
              <Dhis2FormItem
                hidden={hidden}
                displayFormName={t("alot")}
                id={alot}
              >
                <InputField
                  value={formData[uid] || ""}
                  hidden={permanentHide == true ? true : hidden}
                  size="small"
                />
              </Dhis2FormItem>
            ),
            input3: (
              <Dhis2FormItem
                hidden={hidden}
                displayFormName={t(thirdRowTitle)}
                id={thirdRowId}
              >
                <InputField
                  value={formData[uid] || ""}
                  hidden={permanentHide == true ? true : hidden}
                  size="small"
                />
              </Dhis2FormItem>
            ),
          };
        }
      }
    }
  });

  const items = [
    {
      key: 1,
      label: ``,
      children: (
        <Table
          size="small"
          bordered
          pagination={false}
          showHeader={false}
          dataSource={dataSource}
          columns={columns}
        />
      ),
    },
  ];

  return (
    <Form
      onFieldsChange={loadServeyFields}
      initialValues={values}
      form={form}
      onFinish={(fieldsValue) => {
        onSubmit(fieldsValue);
      }}
    >
      <div className="d-md-flex">
        <Col className="leftBar mr-2 mt-2">
          <SideBarContainer />

          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              className="mt-2"
              style={{
                width: "100%",
                backgroundColor: "#4CAF50",
              }}
            >
              {t("save")}
            </Button>
          </Row>
        </Col>

        <Col className="rightBar">
          <Tabs
            defaultActiveKey="1"
            size="small"
            items={items}
            onChange={onTabChange}
          />

          <Button
            type="primary"
            className="mt-2"
            onClick={() => onSubmit(values)}
            style={{
              width: "10%",
              backgroundColor: "#4CAF50",
            }}
          >
            {t("save")}
          </Button>
        </Col>
      </div>
    </Form>
  );
};

export default CensusDetailForm;
