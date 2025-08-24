"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TransactionForm from "../TransactionForm/TransactionForm";

type TransactionTypeProps = "INCOME" | "EXPENSE";

type TransactionProps = {
  id: string;
  userId: string;
  type: TransactionTypeProps;
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
};

export default function TransactionTable() {
  const { address, isConnected } = useAccount();
  const [transaction, setTransaction] = useState<TransactionProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingTx, setEditingTx] = useState<TransactionProps | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!address || !isConnected) return;
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/transactions?address=${address}`);
        const data = await res.json();
        setTransaction(data);
      } catch (error) {
        setTransaction([]);
      }
    };
    fetchTransaction();
  }, [address, isConnected]);

  if (!isMounted) return null;

  return (
    <>
      <div className="w-full my-2 max-w-4xl mx-auto mt-16">
        <table className="w-full table-fixed border border-gray-200 rounded-lg bg-background">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
                Date
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
                Description
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
                Amount
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
                Category
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {transaction.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transaction.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
                    {tx.date.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
                    {tx.description}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
                    {tx.amount}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
                    {tx.category}
                  </td>
                  <td className="text-center border-t border-gray-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="mx-auto flex items-center justify-center p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="cursor-pointer text-gray-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingTx(tx)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 hover:bg-destructive hover:text-background"
                          onClick={() => alert(`Delete ${tx.id}`)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {editingTx && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setEditingTx(null)}
        >
          <div
            className="rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <TransactionForm
              transaction={editingTx}
              onClose={() => setEditingTx(null)}
              onSubmit={(updatedTx) => {
                // Update the transaction array locally
                setTransaction((prev) =>
                  prev.map((tx) =>
                    tx.id === editingTx.id ? { ...tx, ...updatedTx } : tx
                  )
                );
                setEditingTx(null); // close modal
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
