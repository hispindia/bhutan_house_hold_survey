import { LocalStorageTab } from "@/utils/localStorageManager";
import { Button, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { compose } from "redux";
import MainForm from "../../components/MainForm/MainForm";
import withFeedback from "../../hocs/withFeedback";
import withSkeletonLoading from "../../hocs/withSkeletonLoading";
import { changeTab } from "../../redux/actions/data";
import {
  clear,
  getTei,
  getTeiSuccessMessage,
} from "../../redux/actions/data/tei";
import Form from "../../skeletons/Form";

const localTab = new LocalStorageTab();
const LoadingFormContainer = compose(
  withFeedback(),
  withSkeletonLoading(Form)
)(MainForm);

const FormContainer = () => {
  const {
    loading,
    error,
    data: { currentTei },
    currentTab,
    isEditingAttributes,
    success,
  } = useSelector((state) => state.data.tei);

  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTei());
    dispatch(changeTab(localTab.get()));
    return () => {
      dispatch(clear());
    };
  }, []);

  const onCloseClick = () => {
    history.push("/list");
  };

  const onTabChange = (tabId) => {
    dispatch(changeTab(tabId));
    localTab.set(tabId);
  };

  const backToListPage = () => {
    history.push("/list");
  };

  return (
    <LoadingFormContainer
      successMessage={success}
      errorMessage={error}
      errorDisplaying={
        <Space
          style={{
            textAlign: "center",
          }}
          direction="vertical"
        >
          <div>{error}</div>
          <Button onClick={backToListPage}>Back to List page</Button>
        </Space>
      }
      loading={loading}
      mask
      loaded={!!currentTei}
      onCloseClick={onCloseClick}
      currentTab={currentTab}
      onTabChange={onTabChange}
      isEditingAttributes={isEditingAttributes}
      afterSuccess={() => {
        dispatch(getTeiSuccessMessage(null));
      }}
    />
  );
};

export default FormContainer;
