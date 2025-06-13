import { getCaches } from "../actions";
import { CacheForm } from "./cache-form";
import { CacheTable } from "./cache-table";

export default async function CachesPage() {
  const caches = await getCaches();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Legg til cacher</h1>
        <CacheForm />
        <div className="mt-8">
          <CacheTable caches={caches} />
        </div>
      </div>
    </div>
  );
}
