"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
          </tr>
        </thead>
        <tbody>
          {transaction.length === 0 ? (
            <tr>
              <td
                colSpan={4}
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// // Component for a placeholder row
// function TableBody() {
//   return (
//     <tbody>
//       <tr>
//         <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
//           -
//         </td>
//         <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
//           -
//         </td>
//         <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
//           -
//         </td>
//         <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">
//           -
//         </td>
//       </tr>
//     </tbody>
//   );
// }
