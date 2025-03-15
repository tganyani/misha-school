import { CircularProgress } from "@mui/material";

export default function LoadingData() {
  return (
    <div
      style={{
        width: "100vw",
        height:"100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CircularProgress size={20} />
    </div>
  );
}
