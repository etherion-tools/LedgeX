import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionTextarea({ value, onChange }: Props) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-300">Description</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        placeholder="Type a brief description (optional)"
        className="
          w-full px-4 py-3 rounded-lg border
          text-gray-100
          bg-[#23272f] border-gray-700
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />
    </div>
  );
}
