import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Sentence } from "../types/Sentence";
import { DeleteOutline } from "@mui/icons-material";
import { Token } from "../types/Token";
import ListTokens from "./ListTokens";
import { getTokenTypeColor } from "../utils/getTokenTypeColor";
import { useContext } from "react";
import { ApiContext } from "../App";
import { useCookies } from "react-cookie";
import axios from "axios";
import { TokenType } from "../types/TokenTypes";

export default function Row(props: {
  index: number;
  token: Token;
  name: string;
}) {
  /**
   * Component for a single row in the normalized tokens listing.
   *
   * Actually two rows are rendered, the first one with the content of this row
   * and the second with the table used to display the nested tokens.
   */
  const { index, token, name } = props;
  const color = getTokenTypeColor(token.type);

  const { setValue, getValues } = useFormContext<Sentence>();

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

  return (
    <>
      <TableRow>
        <TableCell size="small">{token.text}</TableCell>
        <TableCell size="small">{token.normalized_text}</TableCell>
        <TableCell size="small">
          <span
            style={{ backgroundColor: color, padding: 10, borderRadius: 20 }}
          >
            {TokenType[token.type]}
          </span>
        </TableCell>
        <TableCell size="small">
          {token.children[0] !== undefined ? "ANO" : "NE"}
          {/* FIXME: Testing if the first children is null, because there must be the workaround in the token*/}
        </TableCell>
        <TableCell size="small">
          <IconButton
            onClick={() => {
              setValue(name as "tokens", [
                ...getValues(name as "tokens").slice(0, index),
                ...getValues(name as "tokens").slice(index + 1),
              ]);
              onSubmit(getValues());
            }}
          >
            {/** The as `tokens` is here only because of the type compatibility */}
            <DeleteOutline />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={token.children[0] !== undefined}>
            <ListTokens name={`${name}.${index}.children`} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
