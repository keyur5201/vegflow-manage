import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, ShoppingCart, Users, FileText, TrendingUp, Plus } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: TrendingUp },
  { path: "/vegetables", label: "Vegetables", icon: Leaf },
  { path: "/sellers", label: "Sellers", icon: Users },
  { path: "/invoices", label: "Invoices", icon: FileText },
  { path: "/expenses", label: "Expenses", icon: ShoppingCart },
];

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NavContent = () => (
    <div className="flex flex-col space-y-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? "bg-gradient-primary text-primary-foreground shadow-soft" 
                : "hover:bg-secondary text-foreground hover:shadow-soft"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-fresh rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">VegMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-gradient-primary text-primary-foreground shadow-soft" 
                      : "hover:bg-secondary text-foreground hover:shadow-soft"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-fresh rounded-lg flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-foreground">VegMarket</span>
                </div>
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};