"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TransactionForm from "../TransactionForm/TransactionForm";
import WalletModal from "@/component/Modal/WalletModal"; 

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

  // Delete integration
  const [deleteTarget, setDeleteTarget] = useState<TransactionProps | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!address || !isConnected) return;
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/transactions?address=${address}`);
        const data = await res.json();
        setTransaction(data.transactions);
      } catch (error) {
        setTransaction([]);
      }
    };
    fetchTransaction();
  }, [address, isConnected]);

  async function handleDelete(txId: string, walletAddress: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/transactions/${txId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });
      if (res.ok) {
        setTransaction((prev) => prev.filter((tx) => tx.id !== txId));
      } else {
        const data = await res.json();
        alert(data.error || "Delete failed");
      }
    } catch {
      alert("Error deleting transaction");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

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
            {Array.isArray(transaction) && transaction.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center"
                >
                  No transactions found.
                </td>
              </tr>
            ) : Array.isArray(transaction) ? (
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
                          onClick={() => setDeleteTarget(tx)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : null}
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
                setTransaction((prev) =>
                  prev.map((tx) =>
                    tx.id === editingTx.id
                      ? {
                          ...tx,
                          ...updatedTx,
                          type: updatedTx.type.toUpperCase() as TransactionTypeProps,
                        }
                      : tx
                  )
                );
                setEditingTx(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <WalletModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <div className="text-center p-2">
          <p className="mb-4 font-semibold text-lg">
            Are you sure you want to delete this transaction?
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              disabled={deleting}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() =>
                handleDelete(deleteTarget!.id, address as string)
              }
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
            <button
              disabled={deleting}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </WalletModal>
    </>
  );
}
