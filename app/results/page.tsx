import { getCaches, getLogs } from "../actions";

import { View } from "./view";

export default async function ResultsPage() {
  const [caches, logs] = await Promise.all([getCaches(), getLogs()]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Resultater</h1>
        <View caches={caches} logs={logs} />
      </div>
    </div>
  );
}
