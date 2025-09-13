import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Users, Phone, MapPin, Edit, Trash2 } from "lucide-react";

interface Seller {
  id: string;
  shopName: string;
  sellerName: string;
  address: string;
  contact: string;
  status: "active" | "inactive";
  totalSales?: number;
}

const Sellers = () => {
  const { toast } = useToast();
  const [sellers] = useState<Seller[]>([
    {
      id: "1",
      shopName: "Green Valley Farms",
      sellerName: "Rajesh Kumar",
      address: "123 Market Street, Delhi",
      contact: "+91 98765 43210",
      status: "active",
      totalSales: 45000
    },
    {
      id: "2",
      shopName: "Fresh Produce Co.",
      sellerName: "Priya Sharma",
      address: "456 Farm Road, Mumbai",
      contact: "+91 87654 32109",
      status: "active",
      totalSales: 38500
    },
    {
      id: "3",
      shopName: "Organic Gardens",
      sellerName: "Amit Patel",
      address: "789 Green Lane, Bangalore",
      contact: "+91 76543 21098",
      status: "active",
      totalSales: 29200
    },
    {
      id: "4",
      shopName: "Farm Fresh Ltd.",
      sellerName: "Sunita Reddy",
      address: "321 Harvest Avenue, Hyderabad",
      contact: "+91 65432 10987",
      status: "inactive",
      totalSales: 25800
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredSellers = sellers.filter(seller =>
    seller.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.contact.includes(searchQuery)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Sellers</h1>
            <p className="text-muted-foreground">Manage your vendor network and partnerships</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Seller
          </Button>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sellers by name, shop, or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSellers.length} of {sellers.length} sellers
          </p>
        </div>

        {/* Sellers Grid */}
        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <Card key={seller.id} className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{seller.shopName}</h3>
                      <Badge variant={seller.status === "active" ? "default" : "secondary"} className="mt-1">
                        {seller.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{seller.sellerName}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{seller.contact}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{seller.address}</span>
                  </div>
                </div>

                {seller.totalSales && (
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Sales</span>
                      <span className="text-lg font-semibold text-success">₹{seller.totalSales.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No sellers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "Try adjusting your search criteria"
                : "Start by adding your first seller to the system"
              }
            </p>
            {!searchQuery && (
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add First Seller
              </Button>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Sellers;