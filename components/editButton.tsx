import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Button
      onClick={() => setOpen(!open)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid limegreen",
        height: "20px",
        width: "20px",
        borderRadius: "10px",
        paddingX:"0px",
        minWidth:"20px"
      }}
    >
      <EditIcon sx={{ color: "limegreen", fontSize: "12px" }} />
    </Button>
  );
}
