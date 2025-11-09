import { Provider } from "@dhis2/app-runtime";
import { HeaderBar } from "@dhis2/ui-widgets";
import "./HeaderBar.styles.css";
import propTypes from "./HeaderBar.types.js";

const Dhis2HeaderBar = ({ title }) => {
  return (
    <Provider config={{ apiVersion: "33", baseUrl: "../../.." }}>
      <HeaderBar appName={title} />
    </Provider>
  );
};

Dhis2HeaderBar.propTypes = propTypes;
export default Dhis2HeaderBar;
