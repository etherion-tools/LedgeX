"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
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

export default function Navbar() {
  const { address } = useAccount();

  const [error, setError] = useState<string>();
  const [revenue, setRevenue] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TransactionTypeProps>("INCOME");

  useEffect(() => {
    if (!address) return;
    const fetchTransactionsForFilter = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/transactions?address=${address}&type=${activeTab}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setRevenue([]);
        } else {
          setRevenue(data.transactions || []);
        }
      } catch (error) {
        console.error(error);
        setRevenue([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionsForFilter();
  }, [address, activeTab]);
  return (
    <div className="flex justify-center items-start my-16">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TransactionTypeProps)}
        className="w-full mx-80"
      >
        <TabsList className="w-full h-20 gap-4 bg-foreground">
          <TabsTrigger
            value="INCOME"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground border-background bg-foreground"
          >
            Incomes
          </TabsTrigger>
          <TabsTrigger
            value="EXPENSE"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground border-background bg-foreground"
          >
            Expenses
          </TabsTrigger>
        </TabsList>
        
          <TabsContent value="INCOME" className="text-background">
            {loading ? (
              "Loading..."
            ) : revenue.length === 0 ? (
              "No incomes found."
            ) : (
              <Table className="mt-4 bg-background border border-background rounded-lg text-foreground">
                <TableHeader>
                  <TableRow className="bg-foreground/5">
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Date
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Description
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Category
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenue.map((tx) => (
                    <TableRow
                      key={tx.id}
                      className="hover:bg-foreground/10 transition-colors"
                    >
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.date.slice(0, 10)}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.description}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.amount}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.category}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          <TabsContent value="EXPENSE" className="text-background">
            {loading ? (
              "Loading..."
            ) : revenue.length === 0 ? (
              "No expenses found."
            ) : (
              <Table className="mt-4 bg-background border border-background rounded-lg text-foreground">
                <TableHeader>
                  <TableRow className="bg-foreground/5">
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Date
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Description
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="px-4 py-2 text-center text-sm font-semibold text-foreground">
                      Category
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenue.map((tx) => (
                    <TableRow
                      key={tx.id}
                      className="hover:bg-foreground/10 transition-colors"
                    >
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.date.slice(0, 10)}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.description}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.amount}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-t border-background text-center text-foreground">
                        {tx.category}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
      </Tabs>
    </div>
  );
}
