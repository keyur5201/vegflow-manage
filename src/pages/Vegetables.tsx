import { useState } from "react";
import { Layout } from "@/components/Layout";
import { VegetableCard } from "@/components/VegetableCard";
import { VegetableModal } from "@/components/VegetableModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, Grid, List, Leaf } from "lucide-react";

interface Vegetable {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
}

const Vegetables = () => {
  const { toast } = useToast();
  const [vegetables, setVegetables] = useState<Vegetable[]>([
    {
      id: "1",
      name: "Organic Tomatoes",
      description: "Fresh, juicy organic tomatoes from local farms",
      category: "Fruits",
      price: 45,
      stock: 250
    },
    {
      id: "2", 
      name: "Fresh Spinach",
      description: "Nutrient-rich leafy green vegetables",
      category: "Leafy Greens",
      price: 30,
      stock: 120
    },
    {
      id: "3",
      name: "Green Peppers",
      description: "Crisp and colorful bell peppers",
      category: "Vegetables",
      price: 60,
      stock: 80
    },
    {
      id: "4",
      name: "Red Onions",
      description: "Sharp and flavorful red onions",
      category: "Root Vegetables",
      price: 25,
      stock: 300
    },
    {
      id: "5",
      name: "Carrots",
      description: "Sweet and crunchy orange carrots",
      category: "Root Vegetables",
      price: 35,
      stock: 200
    },
    {
      id: "6",
      name: "Cucumber",
      description: "Fresh and crisp cucumbers",
      category: "Vegetables",
      price: 20,
      stock: 150
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVegetable, setEditingVegetable] = useState<Vegetable | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", ...Array.from(new Set(vegetables.map(v => v.category).filter(Boolean)))];

  const filteredVegetables = vegetables.filter(vegetable => {
    const matchesSearch = vegetable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vegetable.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || vegetable.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddVegetable = (data: any) => {
    const newVegetable: Vegetable = {
      id: Date.now().toString(),
      ...data
    };
    setVegetables([...vegetables, newVegetable]);
    setModalOpen(false);
  };

  const handleEditVegetable = (data: any) => {
    if (!editingVegetable) return;
    
    setVegetables(vegetables.map(v => 
      v.id === editingVegetable.id ? { ...v, ...data } : v
    ));
    setEditingVegetable(null);
    setModalOpen(false);
  };

  const handleDeleteVegetable = (id: string) => {
    if (confirm("Are you sure you want to delete this vegetable?")) {
      setVegetables(vegetables.filter(v => v.id !== id));
      toast({
        title: "Vegetable deleted",
        description: "The vegetable has been removed successfully.",
      });
    }
  };

  const openEditModal = (id: string) => {
    const vegetable = vegetables.find(v => v.id === id);
    if (vegetable) {
      setEditingVegetable(vegetable);
      setModalOpen(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Vegetables</h1>
            <p className="text-muted-foreground">Manage your vegetable inventory and pricing</p>
          </div>
          <Button 
            onClick={() => setModalOpen(true)}
            className="bg-gradient-primary hover:opacity-90 mt-4 md:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vegetable
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vegetables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedCategory(category === "All" ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredVegetables.length} of {vegetables.length} vegetables
          </p>
        </div>

        {/* Vegetables Grid/List */}
        {filteredVegetables.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredVegetables.map((vegetable) => (
              <VegetableCard
                key={vegetable.id}
                {...vegetable}
                onEdit={openEditModal}
                onDelete={handleDeleteVegetable}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No vegetables found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory 
                ? "Try adjusting your search or filter criteria"
                : "Start by adding your first vegetable to the inventory"
              }
            </p>
            {!searchQuery && !selectedCategory && (
              <Button 
                onClick={() => setModalOpen(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Vegetable
              </Button>
            )}
          </Card>
        )}

        {/* Modal */}
        <VegetableModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingVegetable(null);
          }}
          onSubmit={editingVegetable ? handleEditVegetable : handleAddVegetable}
          initialData={editingVegetable || undefined}
          isEditing={!!editingVegetable}
        />
      </div>
    </Layout>
  );
};

export default Vegetables;