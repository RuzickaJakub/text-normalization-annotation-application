import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginDialog() {
  /**
   * Component displays button, which when clicked allows user to insert the sentence.
   * The sentence is then stored to the Sentence structure stored in the main App. The sentence
   * structure is initialized with an empty array for the tokens and empty text in the normalized sentence.
   */

  const [cookies, setCookie] = useCookies<string, { username: string }>([
    "username",
  ]);

  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (text.trim() !== "") {
      setCookie("username", text.toLowerCase(), { path: "/" });
    }
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="text">
        {cookies.username === undefined ? "Login" : cookies.username}
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            value={text}
            onChange={(event) => {
              setText(event.target.value as string);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Přihlásit</Button>
          <Button onClick={handleClose}>Zrušit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
