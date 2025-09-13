import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Users, 
  FileText, 
  TrendingUp, 
  ShoppingCart,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    {
      title: "Total Vegetables",
      value: "147",
      description: "Active varieties",
      icon: Leaf,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Registered Sellers",
      value: "23",
      description: "Verified vendors",
      icon: Users,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Monthly Revenue",
      value: "₹2,45,670",
      description: "This month",
      icon: TrendingUp,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Total Invoices",
      value: "1,247",
      description: "All time",
      icon: FileText,
      trend: { value: 23, isPositive: true }
    }
  ];

  const quickActions = [
    {
      title: "Add Vegetable",
      description: "Register new vegetable variety",
      icon: Leaf,
      path: "/vegetables",
      color: "bg-gradient-fresh"
    },
    {
      title: "New Seller",
      description: "Add vendor to marketplace",
      icon: Users,
      path: "/sellers",
      color: "bg-gradient-primary"
    },
    {
      title: "Create Invoice",
      description: "Generate sales invoice",
      icon: FileText,
      path: "/invoices",
      color: "bg-gradient-accent"
    },
    {
      title: "Record Expense",
      description: "Track business expenses",
      icon: ShoppingCart,
      path: "/expenses",
      color: "bg-gradient-fresh"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="bg-gradient-fresh bg-clip-text text-transparent">VegMarket</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive vegetable market management system. Track inventory, manage sellers, 
            generate invoices, and monitor your business growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <Card className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Vegetables</h3>
              <Link to="/vegetables">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {["Organic Tomatoes", "Fresh Spinach", "Green Peppers", "Red Onions"].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-fresh rounded-lg flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
              <Link to="/sellers">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Green Valley Farms", revenue: "₹45,000" },
                { name: "Fresh Produce Co.", revenue: "₹38,500" },
                { name: "Organic Gardens", revenue: "₹29,200" },
                { name: "Farm Fresh Ltd.", revenue: "₹25,800" }
              ].map((seller, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{seller.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-success">{seller.revenue}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
