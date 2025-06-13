import { Cache } from "@prisma/client";

interface CacheTableProps {
  caches: Cache[];
}

export function CacheTable({ caches }: CacheTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GC Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {caches.map((cache) => (
            <tr key={cache.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cache.gc}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cache.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(cache.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cache.owner}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
