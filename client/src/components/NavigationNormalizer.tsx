import { Button, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { ApiContext } from "../App";
import { Sentence } from "../types/Sentence";
import { useFormContext } from "react-hook-form";
import { GetSentenceReturnType } from "../types/GetSentenceReturnType";
import { useCookies } from "react-cookie";

export default function NavigationNormalizer() {
  const { baseUrl } = useContext(ApiContext);

  const api = axios.create({ baseURL: baseUrl });
  const [cookies] = useCookies<string, { username: string }>(["username"]);

  const { watch, reset } = useFormContext<Sentence>();
  const sentenceId = watch("sentence_id", "0");
  const datasetName = watch("dataset_name", "");

  const loadData = (nextSentenceId: string) => {
    api
      .get<GetSentenceReturnType>("/get-sentence", {
        params: {
          username:
            cookies.username === undefined ? "unknown" : cookies.username,
          dataset_name: datasetName,
          sentence_id: nextSentenceId,
        },
      })
      .then((res) => {
        if (res.data.success) {
          reset(res.data.sentence);
        }
      });
  };

  useEffect(() => {
    loadData(sentenceId);
  }, [sentenceId, datasetName]);

  return (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          // onSubmit(getValues());
          loadData(
            (isNaN(parseInt(sentenceId))
              ? 0
              : parseInt(sentenceId) - 1
            ).toString()
          );
        }}
      >
        Předchozí
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          // onSubmit(getValues());
          loadData(
            (isNaN(parseInt(sentenceId))
              ? 0
              : parseInt(sentenceId) + 1
            ).toString()
          );
        }}
      >
        Následující
      </Button>
    </Stack>
  );
}
