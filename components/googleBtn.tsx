import { stone200 } from "@/lib/constants";
import { Button, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <Stack sx={{display:"flex", flexDirection:"column", rowGap:"8px",my:2}}>
      <Typography sx={{textAlign:"center"}}>Or</Typography>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        sx={{
          textTransform: "lowercase",
          color: "GrayText",
          border: `2px solid ${stone200}`,
          width: "100%",
        }}
      >
        <FcGoogle style={{ marginRight: "8px" }} />
        Login with google
      </Button>
    </Stack>
  );
}
