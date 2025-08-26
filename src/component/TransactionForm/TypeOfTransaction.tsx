import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const transactionTypes = ["Income", "Expense"];

export default function TypeOfTransaction({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-300">Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 rounded-lg border
          text-gray-100
          bg-[#23272f] border-gray-700
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
          ${error ? "border-red-500 focus:ring-red-400" : ""}
        `}
      >
        <option value="" disabled>
          Select a type
        </option>
        {transactionTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
