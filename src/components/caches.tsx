import Button from "@mui/material/Button";
import { CacheData } from "../pages/caches";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface CacheTableProps {
  data: CacheData[];
}
export function CacheTable({ data }: CacheTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>GC</TableCell>
            <TableCell align="right">Navn</TableCell>
            <TableCell align="right">Publisert dato</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.gc}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface CacheDataFormProps {
  addCache: (gc: string, name: string, date: string) => void;
}
export function CacheDataForm({ addCache }: CacheDataFormProps) {
  const [gc, setGc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  return (
    <>
      <TextField
        fullWidth
        id="outlined-gc"
        label="GC"
        variant="outlined"
        value={gc}
        onChange={(e) => setGc(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-name"
        label="Navn"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-date"
        label="Publisert dato"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button
        variant="outlined"
        onClick={() => addCache(gc, name, date)}
        fullWidth
      >
        Legg til
      </Button>
    </>
  );
}
