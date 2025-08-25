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
import Snackbar from "@mui/material/Snackbar";

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
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log(address);
    if (!address || !isConnected) return;
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/transactions?address=${address}`);
        const data = await res.json();
        setTransaction(
          Array.isArray(data.transactions) ? data.transactions : []
        );
      } catch (error) {
        setTransaction([]);
      }
    };
    fetchTransaction();
  }, [address, isConnected]);

  if (!isMounted) return null;

  return (
    <>
      <div className="w-full my-2 max-w-4xl mx-auto mt-16 sm:mx-4">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap hidden sm:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(transaction) ? transaction.length : 0) === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transaction.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {tx.date.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap max-w-xs truncate">
                      {tx.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {tx.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap hidden sm:table-cell">
                      {tx.category}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
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
      </div>
      {editingTx && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setEditingTx(null)}
        >
          <div
            className="rounded-lg max-w-md w-full bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <TransactionForm
              transaction={editingTx}
              onClose={() => setEditingTx(null)}
              onSubmit={async (updatedTx) => {
                try {
                  setTransaction((prev) =>
                    prev.map((tx) =>
                      tx.id === editingTx.id ? { ...tx, ...updatedTx } : tx
                    )
                  );
                  setEditingTx(null);
                  setSnackbarMessage("Transaction edited successfully!");
                  setSnackbarOpen(true);
                } catch (error) {
                  setSnackbarMessage("Failed to edit transaction.");
                  setSnackbarOpen(true);
                }
              }}
            />
          </div>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
