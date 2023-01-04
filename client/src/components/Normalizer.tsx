import { MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useFormContext } from "react-hook-form";
import { ApiContext } from "../App";
import { Sentence } from "../types/Sentence";
import { SentenceState } from "../types/SentenceState";
import HighlightedText from "./HighlightedText";
import ListTokens from "./ListTokens";
import NavigationNormalizer from "./NavigationNormalizer";

export default function Normalizer() {
  const { watch, setValue } = useFormContext<Sentence>();
  const text = watch("original_sentence", "");
  const datasetId = watch("sentence_id", "");
  const datasetName = watch("dataset_name", "");
  const sentenceState = watch(
    "sentence_state",
    Object.keys(SentenceState)[0] as keyof typeof SentenceState
  );

  // All the following is just to save sentence on change SentenceState change
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

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          placeholder="Id datasetu"
          // InputProps={{ readOnly: true }}
          value={datasetId}
          onChange={(event) =>
            setValue("sentence_id", event.target.value as string)
          }
        />
        <TextField
          fullWidth
          placeholder="Název datasetu"
          InputProps={{ readOnly: true }}
          value={datasetName}
          onChange={(event) =>
            setValue("dataset_name", event.target.value as string)
          }
        />
        <Select
          fullWidth
          value={sentenceState}
          onChange={(event) => {
            setValue(
              "sentence_state",
              event.target.value as keyof typeof SentenceState
            );
            onSubmit(getValues());
          }}
        >
          {Object.entries(SentenceState)
            // .sort()
            .map((key, value) => (
              <MenuItem key={value} value={key[0]}>
                {key[1]}
              </MenuItem>
            ))}
        </Select>
      </Stack>

      <p
        style={{
          minHeight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          borderStyle: "solid",
          borderColor: "grey",
        }}
      >
        <HighlightedText text={text} color="none" name="tokens" />
      </p>
      <NavigationNormalizer />
      <ListTokens name="tokens" />
    </div>
  );
}
