import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SavingIndicator = ({ loading }) => {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#fff",
        padding: "16px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      <span style={{ fontSize: "16px", color: "#1890ff", fontWeight: 500 }}>Saving...</span>
    </div>
  );
};

export default SavingIndicator;
