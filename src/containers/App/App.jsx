import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import App from "../../components/App/App";
import AppSkeleton from "../../skeletons/App";

/* REDUX */
import withSkeletonLoading from "@/hocs/withSkeletonLoading";
import {
  setOrgUnitLevels,
  setOrgUnits,
  setProgramMetadata,
  setProgramMetadataMember,
  setSelectedOrgUnit,
} from "@/redux/actions/metadata";
import { useDispatch, useSelector } from "react-redux";

import { getMetadataSet } from "@/utils/offline";

const AppSkeletonLoading = withSkeletonLoading(AppSkeleton)(App);

const AppContainer = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const metadata = useSelector((state) => state.metadata);
  const isOfflineMode = useSelector((state) => state.common.offlineStatus);

  useEffect(() => {
    (async () => {
      setLoading(true);

      Promise.all(getMetadataSet(isOfflineMode)).then(async (results) => {
        const programMetadata = {
          villageHierarchy: [],
          ...results[0],
        };

        dispatch(setProgramMetadata(programMetadata));
        dispatch(setProgramMetadataMember(results[4]));
        dispatch(setOrgUnitLevels(results[3].organisationUnitLevels));
        const savedSelectedOrgUnit = sessionStorage.getItem("selectedOrgUnit");
        i18n.changeLanguage(results[2].settings.keyUiLocale);
        if (savedSelectedOrgUnit) {
          let orgUnitJsonData = null;
          try {
            orgUnitJsonData = JSON.parse(savedSelectedOrgUnit);
          } catch (e) {
            console.log(e);
          }
          dispatch(setSelectedOrgUnit(orgUnitJsonData));
          // history.push("/list");
        }

        dispatch(setOrgUnits(results[5].organisationUnits));
        setLoading(false);
        setLoaded(true);
      });
    })();
  }, []);

  return (
    <AppSkeletonLoading
      loading={loading}
      loaded={loaded}
      mask={true}
      metadata={metadata}
    />
  );
};
export default AppContainer;
