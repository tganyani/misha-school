import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({
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
        height: "26px",
        width: "26px",
        borderRadius: "13px",
        paddingX:"0px",
        minWidth:"26px"
      }}
    >
      <AddIcon sx={{ color: "limegreen", fontSize: "16px" }} />
    </Button>
  );
}
