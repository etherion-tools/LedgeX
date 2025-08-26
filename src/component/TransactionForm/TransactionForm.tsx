"use client";
import React, { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import CategorySelect from "./CategorySelect";
import DescriptionTextarea from "./DescriptionTextarea";
import DatePicker from "./DatePicker";
import TypeOfRevenue from "./TypeOfRevenue";
import { useAccount } from "wagmi";
import { toast } from "sonner";


const categories = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Bonus",
  "Gift",
  "Others",
];

type TransactionFormProps = {
  transaction?: {
    amount: number | string;
    category: string;
    description: string;
    date: string;
    type?: string;
  };
  onClose?: () => void; // callback to close modal
  onSubmit?: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
    type: string;
  }) => void;
};

export default function TransactionForm({
  transaction,
  onClose,
  onSubmit,
}: TransactionFormProps) {
  const [form, setForm] = useState({
    amount: transaction?.amount?.toString() || "",
    category: transaction?.category || "",
    description: transaction?.description || "",
    date: transaction?.date || "",
    type: transaction?.type || "",
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
        type: transaction.type || "",
      });
    }
  }, [transaction]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (
      !form.amount ||
      isNaN(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      errs.amount = "Amount must be a positive number";
    }
    if (!form.type) {
      errs.type = "Type is required";
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

  //Add Transaction Frontend Integration
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        wallet: address,
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
        date: form.date,
        type: form.type.toUpperCase(),
        type: form.type,
      };
      if(!isConnected){
        return setError("Connect your wallet to add a transaction")
      }
      try {
        const res = await fetch("/api/addtransactions", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if(res.ok){
          toast.success("Transaction Added Successfully!")
        }
        if (!res.ok) {
          toast.error("Failed to add transaction")
          return setError(result.error || "Failed to add transaction");
        }
      } catch {
        console.error(error);
        setError("Something went wrong while adding transaction");
      }
      if (onSubmit) {
        onSubmit(data); // call parent callback for add or edit
      }
      // Reset form if not editing
      if (!transaction) {
        setForm({
          amount: "",
          category: "",
          description: "",
          date: "",
          type: "",
        });
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
      <TypeOfRevenue
        value={form.type}
        onChange={(v) => handleChange("type", v)}
        error={errors.type}
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
