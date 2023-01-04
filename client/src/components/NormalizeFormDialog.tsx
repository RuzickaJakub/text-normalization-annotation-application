import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { TokenType } from "../types/TokenTypes";
import {
  FieldArrayWithId,
  UseFieldArrayInsert,
  useFormContext,
} from "react-hook-form";
import { Sentence } from "../types/Sentence";
import { useContext, useState } from "react";
import axios from "axios";
import { ApiContext } from "../App";
import { useCookies } from "react-cookie";

export default function NormalizeFormDialog(props: {
  text: string;
  start: number;
  end: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fields: FieldArrayWithId<Sentence, "tokens", "id">[];
  insert: UseFieldArrayInsert<Sentence, "tokens">;
}) {
  /**
   * Component, which queries the user for other information about the
   * selected token and then store the new token to the Sentence Form.
   */
  let { text, start, end, open, setOpen, insert, fields } = props;

  const [tokenType, setTokenType] = useState<keyof typeof TokenType>(
    Object.keys(TokenType)[0] as keyof typeof TokenType
  );
  const [normalizedToken, setNormalizedToken] = useState<string>("");
  const { getValues } = useFormContext<Sentence>();
  const { baseUrl } = useContext(ApiContext);

  const api = axios.create({ baseURL: baseUrl });
  const [cookies] = useCookies<string, { username: string }>(["username"]);

  const onSubmit = (data: Sentence) => {
    let normalizedSentence = getValues("original_sentence");
    let offset = 0;
    getValues("tokens").forEach((element) => {
      const start = element.begin + offset;
      const end = element.end + offset;
      normalizedSentence =
        normalizedSentence.slice(0, start) +
        element.normalized_text +
        normalizedSentence.slice(end);
      offset += element.normalized_text.length - element.text.length;
    });

    data.normalized_sentence = normalizedSentence;
    api.post(
      "/save-sentence",
      {
        username: cookies.username === undefined ? "unknown" : cookies.username,
        sentence: JSON.stringify(data),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForm = () => {
    // We have to sort the elements here
    let index: number = 0;
    if (fields[0] !== undefined) {
      while (fields[index].begin < start) {
        index++;
        if (fields[index] === undefined) {
          break;
        }
      }
    }

    insert(index, {
      text: text,
      normalized_text: normalizedToken,
      type: tokenType as keyof typeof TokenType,
      children: [],
      begin: start,
      end: end,
    });
    onSubmit(getValues());
    setNormalizedToken("");
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTokenType(event.target.value as keyof typeof TokenType);
  };

  if (!open) {
    return <></>;
  }
  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            id="normalized_token"
            label="Normalizovaný token"
            type="string"
            fullWidth
            variant="standard"
            value={normalizedToken}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNormalizedToken(event.target.value as string);
            }}
          ></TextField>
          <Select
            fullWidth
            id="token_type"
            label="Typ tokenu/Třída"
            type="string"
            variant="outlined"
            value={tokenType}
            onChange={handleChange}
          >
            {Object.entries(TokenType)
              .sort((a, b) => {
                return a[1].localeCompare(b[1]);
              })
              // .sort()
              .map((key, value) => (
                <MenuItem key={value} value={key[0]}>
                  {key[1]}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitForm}>Potvrdit</Button>
          <Button onClick={handleClose}>Zrušit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
