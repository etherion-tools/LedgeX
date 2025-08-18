import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: string[];
};

export default function CategorySelect({ value, onChange, error, options }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-300">Category</label>
      <select
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
      >
        <option value="" disabled>Select a category</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
