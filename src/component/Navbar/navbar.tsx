import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Navbar() {
  return (
    <div className="flex justify-center items-start my-4">
      <Tabs defaultValue="account" className="w-full mx-80">
        <TabsList className="w-full h-20 gap-4">
          <TabsTrigger
            value="incomes"
            className="data-[state=active]:bg-white data-[state=active]:text-black border-foreground"
          >
            Incomes
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="data-[state=active]:bg-white data-[state=active]:text-black border-foreground"
          >
            Expenses
          </TabsTrigger>
        </TabsList>
        <div className="flex border border-foreground rounded-lg p-4 mt-6">
        <TabsContent value="incomes">
          Make changes to your incomes here.
        </TabsContent>
        <TabsContent value="expenses">Change your expenses here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
