import { getLogs } from "../actions";
import { LogForm } from "./log-form";
import { LogTable } from "./log-table";

export default async function LogsPage() {
  const logs = await getLogs();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Legg til logger</h1>
        <LogForm />
        <div className="mt-8">
          <LogTable logs={logs} />
        </div>
      </div>
    </div>
  );
}
