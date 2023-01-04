import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App";
import { Dataset } from "../types/Dataset";
import NavigationData from "./NavigationData";
import StartIcon from "@mui/icons-material/Start";
import { useFormContext } from "react-hook-form";
import { Sentence } from "../types/Sentence";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ListDatasets() {
  const { baseUrl } = useContext(ApiContext);

  const api = axios.create({ baseURL: baseUrl });

  const [cookies] = useCookies<string, { username: string }>(["username"]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const { setValue } = useFormContext<Sentence>();
  let navigate = useNavigate();

  const loadData = async () => {
    api
      .get<Dataset[]>("/get-datasets", {
        params: {
          username:
            cookies.username === undefined ? "unknown" : cookies.username,
        },
      })
      .then((res) => {
        setDatasets(res.data);
      });
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []); // If the array is removed it loads still again and again

  return (
    <Stack spacing={3} paddingTop={2}>
      <NavigationData />
      <Button fullWidth variant="contained" onClick={() => loadData()}>
        Načíst znovu
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Název</TableCell>
            <TableCell>Počet vět</TableCell>
            <TableCell>Počet anotovaných vět</TableCell>
            <TableCell>Vybrat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datasets.map((value) => (
            <TableRow key={value.name}>
              <TableCell>{value.name}</TableCell>
              <TableCell>{value.sentence_count}</TableCell>
              <TableCell>{value.annotated_count}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setValue("dataset_name", value.name);
                    if (value.sentence_count === value.annotated_count) {
                      // If all sentences are annotated choose the last approved
                      setValue("sentence_id", value.last_approved.toString());
                    } else {
                      setValue("sentence_id", value.annotated_count.toString());
                    }
                    navigate("/");
                  }}
                >
                  <StartIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}
