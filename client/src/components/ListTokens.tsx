import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Sentence } from "../types/Sentence";
import Row from "./Row";

export default function ListTokens(props: { name: string }) {
  const { name } = props;
  const { watch } = useFormContext<Sentence>();
  const tokens = watch(`${name}` as "tokens", []);

  return (
    <Table aria-label="dense collapsible table" size={"small"}>
      <TableHead>
        <TableRow>
          {/*The size is here only to make the header heigher*/}
          <TableCell size="medium">Token</TableCell>
          <TableCell>Normalizovaný token </TableCell>
          <TableCell>Typ tokenu</TableCell>
          <TableCell>Existují vnořené prvky</TableCell>
          <TableCell>Smazat</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tokens.map((token, index) => (
          <Row
            key={token.begin} // The token.start is a unique because every other element starting from the same position will be in the nested array
            index={index}
            token={token}
            name={name}
          ></Row>
        ))}
      </TableBody>
    </Table>
  );
}
