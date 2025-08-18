import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function AmountInput({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-300">Amount</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter amount"
        className={`
          w-full px-4 py-3 rounded-lg border
          text-gray-100 
          bg-[#23272f] border-gray-700
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
          ${error ? "border-red-500 focus:ring-red-400" : ""}
        `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
