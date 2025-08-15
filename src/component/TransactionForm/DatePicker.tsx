import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function DatePicker({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-300">Date</label>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
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
