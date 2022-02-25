import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { LogData } from "../pages/logs";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffectOnce } from "../hooks/useEffectOnce";

interface LogTableProps {
  data: LogData[];
}
export function LogTable({ data }: LogTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Navn</TableCell>
            <TableCell align="right">GC kode</TableCell>
            <TableCell align="right">Publisert dato</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.gc}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface LogDataFormProps {
  addLog: (gc: string, name: string, date: string) => void;
}
export function LogDataForm({ addLog }: LogDataFormProps) {
  const [gc, setGc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [addedNames, setAddedNames] = useState<string[]>([]);

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("addedNames");
    const savedData: string[] =
      jsonValue != null ? JSON.parse(jsonValue) : undefined;
    setAddedNames(savedData);
  });

  useEffect(() => {
    localStorage.setItem("addedNames", JSON.stringify(addedNames));
  }, [addedNames]);

  function selectName(name: string | null) {
    console.log(name);
    if (name) {
      if (!addedNames.includes(name)) {
        setAddedNames((prev) => {
          return [...prev, name];
        });
      }
      setName(name);
    }
  }

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
      <Typography>Husk trykk enter</Typography>
      <Autocomplete
        id="name"
        freeSolo
        options={addedNames.map((option) => option)}
        onChange={(event: any, newValue: string | null) => {
          selectName(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Nick" />}
      />
      <Typography>Valgt nick: {name}</Typography>
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
        onClick={() => addLog(gc, name, date)}
        fullWidth
      >
        Legg til
      </Button>
    </>
  );
}
