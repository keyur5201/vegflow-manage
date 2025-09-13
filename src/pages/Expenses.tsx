import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ShoppingCart, Calendar, FileText } from "lucide-react";

const Expenses = () => {
  const expenses = [
    {
      id: "1",
      date: "2024-01-15",
      detail: "Transportation costs for vegetable delivery",
      amount: 1500,
      category: "Transportation"
    },
    {
      id: "2",
      date: "2024-01-16", 
      detail: "Market stall rental fee",
      amount: 2500,
      category: "Rent"
    },
    {
      id: "3",
      date: "2024-01-17",
      detail: "Packaging materials and bags",
      amount: 800,
      category: "Supplies"
    },
    {
      id: "4",
      date: "2024-01-18",
      detail: "Electricity bill for cold storage",
      amount: 3200,
      category: "Utilities"
    }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Expenses</h1>
            <p className="text-muted-foreground">Track and manage all business expenses</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="p-6 mb-8 bg-gradient-fresh text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Expenses This Month</h3>
              <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8" />
            </div>
          </div>
        </Card>

        {/* Search */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses by detail or category..."
              className="pl-10 bg-background/50"
            />
          </div>
        </Card>

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense.id} className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-fresh rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{expense.detail}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="secondary">{expense.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-destructive">₹{expense.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Amount</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {expenses.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No expenses recorded</h3>
            <p className="text-muted-foreground mb-4">Start tracking your business expenses</p>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add First Expense
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Expenses;