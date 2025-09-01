import HierachySelector from "@/components/HierachySelector/HierachySelector.component";
import {
  CloseOutlined,
  EditOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { isEqual } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import withDhis2FormItem from "../../hocs/withDhis2Field";
import CFormControl from "../CustomAntForm/CFormControl";
import InputField from "../CustomAntForm/InputField";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

import { MapPin } from "lucide-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Search from "react-leaflet-search";
const ProfileForm = ({
  onSubmit,
  isEditingAttributes: isEdit,
  setIsEditingAttributes: setIsEdit,
  hasTeiParam,
  onNextClick,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { minDate, maxDate } = useSelector((state) => state.metadata);
  const {
    selectedOrgUnit,
    programMetadata: {
      trackedEntityAttributes,
      organisationUnits,
      villageHierarchy,
    },
  } = useSelector((state) => state.metadata);
  const profile = useSelector((state) => state.data.tei.data.currentTei);
  const Dhis2FormItem = useMemo(
    () => withDhis2FormItem(trackedEntityAttributes)(CFormControl),
    []
  );

  const randomNumber = useMemo(() => {
    return Math.floor(1000 + Math.random() * 9000);
  }, []);
  //add map

  // Fix default marker issue in Leaflet
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [coordinates, setCoordinates] = useState(null);
  const [open, setOpen] = React.useState(false);
  function LocationMarker({ setCoordinates, closeDialog }) {
    useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
        closeDialog(); // Close dialog after selecting location
      },
    });
    return null;
  }

  // Get live location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates(`[${pos.coords.latitude}, ${pos.coords.longitude}]`);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  //add map

  const handleGenerateTemporaryBookNumber = ([
    residenceStatus,
    unitOfVillage,
    houseNumber,
    temporaryFamilyBookNumber,
  ]) => {
    const values = [
      "TEMP",
      residenceStatus ? residenceStatus.substr(0, 1) : "< >",
      organisationUnits?.find((ou) => ou.id === selectedOrgUnit?.id).code,
      unitOfVillage ? unitOfVillage : "< >",
      houseNumber ? houseNumber : "< >",
      temporaryFamilyBookNumber
        ? temporaryFamilyBookNumber.split("_")[5]
        : randomNumber,
    ];
    return values.join("_");
  };

  const returnValueForVillageSelector = (type) => {
    let value = "";
    let province = "";
    let district = "";
    let village = "";
    let find = organisationUnits?.find((e) => e.id === profile.orgUnit);
    if (find) {
      let findVillageHierarchy = villageHierarchy.find(
        (e) => e.value === find.code
      );
      if (findVillageHierarchy) {
        let array = findVillageHierarchy.path.split("/");
        province = array[0] ? array[0] : "";
        district = array[1] ? array[1] : "";
        village = array[2] ? array[2] : "";
      }
    }
    if (type === "province") {
      value = province;
    }
    if (type === "district") {
      value = district;
    }
    if (type === "village") {
      value = village;
    }
    return value;
  };

  // const cleanFormData = (values) => pickBy(values, identity);

  return (
    <Form
      className=""
      initialValues={profile.attributes}
      form={form}
      name="familyRegistration"
      onFinish={(fieldsValue) => {
        // onSubmit(cleanFormData(fieldsValue));
        onSubmit(fieldsValue);
      }}
    >
      <div className="row col-lg-12">
        <div className="col-12">
          <Dhis2FormItem id="BUEzQEErqa7">
            <InputField
              disabled={!profile.isNew}
              size="large"
              valueType="YEAR"
              disabledDate={(date) =>
                date < moment([minDate]) || date > moment([maxDate])
              }
            />
          </Dhis2FormItem>
        </div>
      </div>
      <div className="row col-lg-12">
        <div className="col-lg-3">
          <Dhis2FormItem
            id="b4UUhQPwlRH"
            // displayFormName={t("unitOfVillage")}
          >
            <InputField size="large" disabled={true} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="eMYBznRdn0t"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>
        <div className="col-lg-3">
          <Dhis2FormItem
            id="kvCvhyGBLIi"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem id="alEL4UIuRee">
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="WcKI8B0MYaB"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="SHPW4d00NnM"
            // displayFormName={t("houseNumber")}
          >
             <InputField size="large"  disabled={!isEdit} />
            {/* <div className="flex flex-col gap-3 w-full max-w-md"> */}
              {/* Input with map icon */}
              {/* <div className="relative flex items-center"> */}
                {/* <InputField
                size="large"
                  valueType="COORDINATE"
                  value={coordinates}
                  onChange={setCoordinates}
                  disabled={true}

                />
                <button
                  type="button"
                  className="absolute right-2 text-blue-600"
                  onClick={() => setOpen(true)}
                >
                  <MapPin size={22} />
                </button> */}
              {/* </div> */}

              {/* Dialog with map */}
              {/* <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                  style: {
                    borderRadius: 16,
                    padding: "0",
                    height: "80%",
                    width: "80%",
                  },
                }}
              >
                <DialogTitle>Select Location</DialogTitle>
                <DialogContent sx={{ height: "500px", p: 0 }}>
                  {coordinates && (
                    <MapContainer
                      center={coordinates}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <Marker position={coordinates} icon={markerIcon} />
                      <LocationMarker
                        setCoordinates={setCoordinates}
                        closeDialog={() => setOpen(false)}
                      />
                    </MapContainer>
                  )}
                </DialogContent>
              </Dialog> */}
            {/* </div> */}
            {/* <InputField size="large" disabled={!isEdit} /> */}
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="HP5XaFj6iZ7"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="lOMK3xUwRc7"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>

        <div className="col-lg-3">
          <Dhis2FormItem
            id="dDJdN7rtIoA"
            // displayFormName={t("houseNumber")}
          >
            <InputField size="large" disabled={!isEdit} />
          </Dhis2FormItem>
        </div>
      </div>

      <Space>
        <Button.Group>
          {!isEdit ? (
            <Button
              key={0}
              size="large"
              type="primary"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <EditOutlined /> {t("edit")}
            </Button>
          ) : (
            <CFormControl
              dependentFields={[
                "BUEzQEErqa7",
                // "G9KYJZ8dW76",
                "b4UUhQPwlRH",
                "eMYBznRdn0t",
                "alEL4UIuRee",
                "WcKI8B0MYaB",
                "lOMK3xUwRc7",
                "dDJdN7rtIoA",
                "SHPW4d00NnM",

                // "xbwURy2jG2K",
                // "W8WZcI1SUjC",
                // "rzGghDo5ipI",
                // "nYcHuUDqeBY",
                // "AiwUJOsOC86",
                // "CKQuSLAY0Xf",
                // "gSImG6wxCkY",
                // "UQdxC9ojcju",
                // "BgKZvUxweKO",
                // "utW5gK4ihvz",
                // "XwnHdecsbvz",
              ]}
              childPropsFunc={() => {
                return {
                  disabled: isEqual(
                    // cleanFormData(profile.attributes),
                    // cleanFormData(form.getFieldsValue()),
                    profile.attributes,
                    form.getFieldsValue()
                  ),
                };
              }}
            >
              <Button
                key={1}
                size="large"
                type="primary"
                htmlType="submit"
                className="mb-3"
              >
                <SaveOutlined /> {t("save")}
              </Button>
            </CFormControl>
          )}
          <Button
            key={2}
            size="large"
            onClick={() => {
              setIsEdit(false);
              form.resetFields();
            }}
            disabled={!isEdit}
          >
            <CloseOutlined /> {t("cancel")}
          </Button>
        </Button.Group>
        <Button
          onClick={onNextClick}
          size="large"
          disabled={isEdit || !hasTeiParam}
          type="primary"
        >
          {t("next")} <RightOutlined />
        </Button>
      </Space>
    </Form>
  );
};

export default ProfileForm;
