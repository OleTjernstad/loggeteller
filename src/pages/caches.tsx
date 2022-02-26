import { CacheDataForm, CacheTable } from "../components/caches";
import { Card, CardContent } from "../components/card";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { useEffectOnce } from "../hooks/useEffectOnce";

export interface CacheData {
  gc: string;
  name: string;
  date: string;
  owner: string;
}
export function Caches() {
  const [caches, setCaches] = useState<CacheData[]>([]);

  function addCache(gc: string, name: string, date: string, owner: string) {
    setCaches((prev) => {
      return [...prev, { gc, name, date, owner }];
    });
  }

  useEffectOnce(() => {
    const jsonValue = localStorage.getItem("caches");
    const savedData: CacheData[] =
      jsonValue != null ? JSON.parse(jsonValue) : [];
    setCaches(savedData);
  });
  useEffect(() => {
    localStorage.setItem("caches", JSON.stringify(caches));
  }, [caches]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Legg til cacher">
            <CardContent>
              <CacheDataForm addCache={addCache} />
              <br />
              <br />
              <br />
              <CacheTable data={caches} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
