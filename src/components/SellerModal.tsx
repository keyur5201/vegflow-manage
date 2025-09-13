import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export interface SellerFormData {
  shopName: string;
  sellerName: string;
  address: string;
  contact: string;
  status?: "active" | "inactive";
}

interface SellerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SellerFormData) => void;
  initialData?: SellerFormData;
  isEditing?: boolean;
}

export const SellerModal = ({ open, onClose, onSubmit, initialData, isEditing = false }: SellerModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<SellerFormData>({
    defaultValues: { status: "active" },
  });

  useEffect(() => {
    if (open) {
      reset({ status: "active", ...initialData });
    }
  }, [open, initialData, reset]);

  const currentStatus = watch("status");

  const onFormSubmit = (data: SellerFormData) => {
    onSubmit(data);
    toast({ title: "Success", description: `Seller ${isEditing ? "updated" : "added"} successfully` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Seller" : "Add New Seller"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name *</Label>
            <Input id="shopName" placeholder="e.g., Green Valley Farms" className="bg-background/50" {...register("shopName", { required: "Shop name is required" })} />
            {errors.shopName && (<p className="text-sm text-destructive">{errors.shopName.message}</p>)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sellerName">Seller Name *</Label>
            <Input id="sellerName" placeholder="e.g., Rajesh Kumar" className="bg-background/50" {...register("sellerName", { required: "Seller name is required" })} />
            {errors.sellerName && (<p className="text-sm text-destructive">{errors.sellerName.message}</p>)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact *</Label>
            <Input id="contact" placeholder="e.g., +91 98765 43210" className="bg-background/50" {...register("contact", { required: "Contact is required" })} />
            {errors.contact && (<p className="text-sm text-destructive">{errors.contact.message}</p>)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter full address" className="bg-background/50 min-h-[80px]" {...register("address")} />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={currentStatus} onValueChange={(v: "active" | "inactive") => setValue("status", v)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">{isEditing ? "Update" : "Add"} Seller</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};