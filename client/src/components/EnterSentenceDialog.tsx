import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sentence } from "../types/Sentence";

export default function EnterSentenceDialog() {
  /**
   * Component displays button, which when clicked allows user to insert the sentence.
   * The sentence is then stored to the Sentence structure stored in the main App. The sentence
   * structure is initialized with an empty array for the tokens and empty text in the normalized sentence.
   */

  const { reset } = useFormContext<Sentence>();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    reset({
      original_sentence: text.trim(),
      normalized_sentence: text.trim(),
      tokens: [],
    });
    setText(""); //Clear the sentence input
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={handleClickOpen}>
        Vložit větu
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Vložte větu:</DialogTitle>
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
          <Button onClick={handleSubmit}>Potvrdit</Button>
          <Button onClick={handleClose}>Zrušit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
