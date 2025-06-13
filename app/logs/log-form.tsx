"use client";

import { addLog } from "../actions";
import { useState } from "react";

export function LogForm() {
  const [gc, setGc] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [addedNames, setAddedNames] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await addLog(gc, name, date);
    if (result.success) {
      setGc("");
      setDate("");
      if (!addedNames.includes(name)) {
        setAddedNames([...addedNames, name]);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="gc" className="block text-sm font-medium text-gray-700">
          GC Code
        </label>
        <input
          type="text"
          id="gc"
          value={gc}
          onChange={(e) => setGc(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          list="names"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <datalist id="names">
          {addedNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Log
      </button>
    </form>
  );
}
