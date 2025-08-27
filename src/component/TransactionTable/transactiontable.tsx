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
import { toast } from "sonner";
import Snackbar from "@mui/material/Snackbar";

type TransactionTypeProps = "INCOME" | "EXPENSE";
type TransactionProps = {
  id: string;
  userId: string; // will be UUID
  type: TransactionTypeProps;
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
};
type TransactionFormSubmit = {
  id?: string;
  userId: string; // UUID
  amount: number;
  category: string;
  description: string;
  date: string;
  type: string;
};

export default function TransactionTable() {
  const { address, isConnected } = useAccount();
  const [transaction, setTransaction] = useState<TransactionProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingTx, setEditingTx] = useState<TransactionProps | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TransactionProps | null>(
    null
  );
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
        setTransaction(
          Array.isArray(data.transactions) ? data.transactions : []
        );
      } catch (error) {
        console.error("Failed to fetch transactions", error);
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
        toast.success("Transaction deleted successfully!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting transaction", error);
      toast.error("Error deleting transaction");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  // Main FIX (edit): send editingTx.userId (UUID) to update API!
  async function handleEdit(updatedTx: TransactionFormSubmit) {
    if (!editingTx) return;
    try {
      const res = await fetch(`/api/edittransactions?address=${address}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedTx,
          userId: editingTx.userId,
          id: editingTx.id,
          type: updatedTx.type,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTransaction((prev) =>
          prev.map((tx) =>
            tx.id === editingTx.id ? { ...tx, ...data.transaction } : tx
          )
        );
        toast.success("Transaction updated successfully!");
        setEditingTx(null);
      } else {
        const err = await res.json();
        toast.error(err.error || "Update failed!");
      }
    } catch (error) {
      console.error("Network/server error!", error);
      toast.error("Network/server error!");
    }
  }

  if (!isMounted) return null;
  return (
    <>
      <div className="w-full my-2 max-w-md mt-8 sm:mx-2">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-[320px] bg-foreground border border-background rounded-lg">
            <thead className="bg-foreground">
              <tr>
                <th className="px-2 py-1 text-center text-sm font-semibold text-background w-1/5">
                  Date
                </th>
                <th className="px-2 py-1 text-center text-sm font-semibold text-background w-1/5">
                  Description
                </th>
                <th className="px-2 py-1 text-center text-sm font-semibold text-background w-1/5">
                  Amount
                </th>
                <th className="px-2 py-1 text-center text-sm font-semibold text-background w-1/5">
                  Category
                </th>
                <th className="px-2 py-1 text-center text-sm font-semibold text-background w-12"></th>
              </tr>
            </thead>
            <tbody>
              {transaction.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-background"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transaction.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-2 py-1 border-t border-gray-200 text-background text-center">
                      {tx.date.slice(0, 10)}
                    </td>
                    <td className="px-2 py-1 border-t border-gray-200 text-background text-center">
                      {tx.description}
                    </td>
                    <td className="px-2 py-1 border-t border-gray-200 text-background text-center">
                      {tx.amount}
                    </td>
                    <td className="px-2 py-1 border-t border-gray-200 text-background text-center">
                      {tx.category}
                    </td>
                    <td className="text-center border-t border-gray-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="mx-auto flex items-center justify-center p-2 hover:bg-foreground rounded-full">
                            <MoreVertical className="cursor-pointer text-background" />
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
              onSubmit={handleEdit}
            />
          </div>
        </div>
      )}
      <WalletModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <div className="text-center p-2">
          <p className="mb-4 font-semibold text-lg">
            Are you sure you want to delete this transaction?
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              disabled={deleting}
              className="bg-red-600 text-white px-4 py-2 rounded hovtext-background"
              onClick={() => handleDelete(deleteTarget!.id, address as string)}
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
