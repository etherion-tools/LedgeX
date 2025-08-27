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
    id?: string;
    amount: number | string;
    category: string;
    description: string;
    date: string;
    type?: string;
    userId?: string;
  };
  onClose?: () => void;
  onSubmit?: (data: {
    id?: string;
    userId: string;
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
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);

  // userId is always string, fallback "" prevents undefined
  const userId: string = transaction?.userId || address || "";

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
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = "Amount must be a positive number";
    if (!form.type) errs.type = "Type is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const formattedDate = form.date
        ? new Date(form.date).toISOString().slice(0, 10)
        : "";
      const data = {
        ...(transaction?.id ? { id: transaction.id } : {}),
        userId,
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
        date: formattedDate,
        type: form.type,
      };
      if (!isConnected) {
        return setError("Connect your wallet to add a transaction");
      }

      if (onSubmit) {
        await onSubmit(data); // Edit flow
      } else {
        try {
          const res = await fetch("/api/addtransactions", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data, wallet: address }),
          });
          const result = await res.json();
          if (res.ok) toast.success("Transaction Added Successfully!");
          if (!res.ok) {
            toast.error("Failed to add transaction");
            return setError(result.error || "Failed to add transaction");
          }
        } catch (error) {
          console.error("Error adding transaction:", error);
          setError("Something went wrong while adding transaction");
        }
      }
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
      onClose?.();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm h-full bg-[#18181b] rounded-2xl p-6 shadow-lg space-y-3 border border-gray-800"
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
        className="w-full py-3 rounded-lg font-semibold text-white transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 focus:outline-none shadow"
      >
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  );
}
