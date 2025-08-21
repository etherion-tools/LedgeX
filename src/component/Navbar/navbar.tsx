
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Navbar() {
  return (
    <div className="flex justify-center items-start my-16">
      <Tabs defaultValue="account" className="w-full mx-80">
        <TabsList className="w-full h-20 gap-4 bg-foreground">
          <TabsTrigger
            value="incomes"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground border-background bg-foreground"
          >
            Incomes
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground border-background bg-foreground"
          >
            Expenses
          </TabsTrigger>
        </TabsList>
        <div className="flex border border-background rounded-lg p-4 mt-6">
        <TabsContent value="incomes" className="text-background">
          Make changes to your incomes here.
        </TabsContent>
        <TabsContent value="expenses" className="text-background">Change your expenses here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}