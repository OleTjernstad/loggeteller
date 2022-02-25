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
import { useState } from "react";

interface ResultTableProps {
  logsByName: {
    [key: string]: LogWithPoints[];
  };
  caches: CacheData[];
}
export function ResultTable({ logsByName, caches }: ResultTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Navn</TableCell>
            {caches.map((c) => (
              <TableCell>{c.gc}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(logsByName).map((row) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {caches.map((c) => {
                const cache = row.find((r) => r.gc === c.gc);
                return <TableCell>{cache?.point}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
