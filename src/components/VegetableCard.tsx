import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Leaf } from "lucide-react";

interface VegetableCardProps {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const VegetableCard = ({ 
  id, 
  name, 
  description, 
  category, 
  price, 
  stock, 
  onEdit, 
  onDelete 
}: VegetableCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-fresh rounded-lg flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              {category && (
                <Badge variant="secondary" className="mt-1">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(id)}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          {price && (
            <div className="text-sm">
              <span className="text-muted-foreground">Price: </span>
              <span className="font-semibold text-primary">₹{price}/kg</span>
            </div>
          )}
          {stock !== undefined && (
            <div className="text-sm">
              <span className="text-muted-foreground">Stock: </span>
              <span className={`font-semibold ${stock > 0 ? "text-success" : "text-destructive"}`}>
                {stock} kg
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};