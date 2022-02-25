import { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
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
import Typography from "@mui/material/Typography";
import { useEffectOnce } from "../hooks/useEffectOnce";

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
            <TableCell>Navn</TableCell>
            <TableCell>Publisert dato</TableCell>
            <TableCell>Utlagt av</TableCell>
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface CacheDataFormProps {
  addCache: (gc: string, name: string, date: string, owner: string) => void;
}
export function CacheDataForm({ addCache }: CacheDataFormProps) {
  const [gc, setGc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
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
      setOwner(name);
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
      <Typography>Valgt nick: {owner}</Typography>

      <Button
        variant="outlined"
        onClick={() => addCache(gc, name, date, owner)}
        fullWidth
      >
        Legg til
      </Button>
    </>
  );
}
