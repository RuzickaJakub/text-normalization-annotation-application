import { Button, Stack } from "@mui/material";
import axios from "axios";
import FileUploadDialog from "./FileUploadDialog";
import { saveAs } from "file-saver";
import { useContext } from "react";
import { ApiContext } from "../App";
import { useCookies } from "react-cookie";

export default function NavigationData() {
  const { baseUrl } = useContext(ApiContext);

  const api = axios.create({ baseURL: baseUrl });

  const [cookies] = useCookies<string, { username: string }>(["username"]);

  const filename: string = "";
  return (
    <Stack direction="row" spacing={2}>
      {/* <EnterSentenceDialog /> */}
      <FileUploadDialog api={api} />
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          api
            .get("/export/data", {
              responseType: "arraybuffer",
              params: {
                username:
                  cookies.username === undefined ? "unknown" : cookies.username,
                filename: filename,
              },
            })
            .then((res) => {
              const file = new Blob([res.data], {
                type: res.headers["content-type"],
              });
              saveAs(file, "export.zip");
            });
        }}
      >
        stáhnout data
      </Button>
    </Stack>
  );
}
