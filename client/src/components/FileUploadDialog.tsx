import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosInstance } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function FileUploadDialog(props: { api: AxiosInstance }) {
  /**
   * Component displays button, which when clicked allows user to insert the sentence.
   * The sentence is then stored to the Sentence structure stored in the main App. The sentence
   * structure is initialized with an empty array for the tokens and empty text in the normalized sentence.
   */
  const { api } = props;
  const [cookies] = useCookies<string, { username: string }>(["username"]);

  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    api.post(
      "/upload/data",
      {
        username: cookies.username === undefined ? "unknown" : cookies.username, // FIXME: only for testing purposes
        filename: file!.name,
        file: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setFile(null);
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={handleClickOpen}>
        Nahrát dataset
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Nahrajte dataset</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={(event) => setFile(event?.target.files![0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Potvrdit</Button>
          <Button onClick={handleClose}>Zrušit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
