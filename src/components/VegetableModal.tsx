import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface VegetableFormData {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
}

interface VegetableModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VegetableFormData) => void;
  initialData?: VegetableFormData;
  isEditing?: boolean;
}

export const VegetableModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  isEditing = false 
}: VegetableModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<VegetableFormData>();

  useEffect(() => {
    if (open) {
      reset(initialData || {});
    }
  }, [open, initialData, reset]);

  const onFormSubmit = (data: VegetableFormData) => {
    try {
      onSubmit(data);
      toast({
        title: "Success",
        description: `Vegetable ${isEditing ? 'updated' : 'added'} successfully`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Vegetable" : "Add New Vegetable"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter vegetable name"
              className="bg-background/50"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category")}
              placeholder="e.g., Leafy Greens, Root Vegetables"
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹/kg)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock (kg)</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                placeholder="0"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter vegetable description"
              className="bg-background/50 min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              {isEditing ? "Update" : "Add"} Vegetable
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};