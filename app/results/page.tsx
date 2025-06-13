import { getCaches, getLogs } from "../actions";
import { ResultsTable } from "./results-table";
import { WinnerPicker } from "./winner-picker";

export default async function ResultsPage() {
  const [caches, logs] = await Promise.all([getCaches(), getLogs()]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Resultater</h1>
        <WinnerPicker caches={caches} logs={logs} />
        <div className="mt-8">
          <ResultsTable caches={caches} logs={logs} />
        </div>
      </div>
    </div>
  );
}
