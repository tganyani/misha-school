import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export default function CancelButton({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => void;
}) {
  return (
    <Button
      onClick={() => handleDelete(id)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid limegreen",
        height: "20px",
        width: "20px",
        borderRadius: "10px",
        paddingX: "0px",
        minWidth: "20px",
        "&:hover":{
             border: "2px solid tomato"
        }
      }}
    >
      <CloseIcon sx={{ color: "limegreen", fontSize: "16px",'&:hover':{color:"tomato"} }} />
    </Button>
  );
}
