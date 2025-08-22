"use client";
import React, { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import CategorySelect from "./CategorySelect";
import DescriptionTextarea from "./DescriptionTextarea";
import DatePicker from "./DatePicker";

const categories = [
  "Income",
  "Expense",
];

type TransactionFormProps = {
  transaction?: {
    amount: number | string;
    category: string;
    description: string;
    date: string;
  };
  onClose?: () => void; // callback to close modal
  onSubmit?: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
};

export default function TransactionForm({ transaction, onClose, onSubmit }: TransactionFormProps) {
  const [form, setForm] = useState({
    amount: transaction?.amount.toString() || "",
    category: transaction?.category || "",
    description: transaction?.description || "",
    date: transaction?.date || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update form if transaction prop changes (important for editing different rows)
  useEffect(() => {
    if (transaction) {
      setForm({
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
      });
    }
  }, [transaction]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      errs.amount = "Amount must be a positive number";
    }
    if (!form.category) {
      errs.category = "Category is required";
    }
    if (!form.date) {
      errs.date = "Date is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
        date: form.date,
      };
      if (onSubmit) {
        onSubmit(data); // call parent callback for add or edit
      }
      // Reset form if not editing
      if (!transaction) {
        setForm({ amount: "", category: "", description: "", date: "" });
      }
      setErrors({});
      onClose?.(); // close modal if provided
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md md:max-w-lg mx-auto bg-[#18181b] rounded-2xl p-8 shadow-lg space-y-6 border border-gray-800"
    >
      <AmountInput
        value={form.amount}
        onChange={(v) => handleChange("amount", v)}
        error={errors.amount}
      />
      <CategorySelect
        value={form.category}
        onChange={(v) => handleChange("category", v)}
        error={errors.category}
        options={categories}
      />
      <DescriptionTextarea
        value={form.description}
        onChange={(v) => handleChange("description", v)}
      />
      <DatePicker
        value={form.date}
        onChange={(v) => handleChange("date", v)}
        error={errors.date}
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white transition-all bg-gradient-to-r
          from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 focus:outline-none shadow"
      >
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}
