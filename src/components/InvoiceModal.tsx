import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export interface InvoiceFormData {
  billNumber: string;
  date: string; // ISO string (yyyy-mm-dd)
  seller: string;
  buyer: string;
  amount: number;
  status: "paid" | "pending";
}

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: InvoiceFormData) => void;
  initialData?: Partial<InvoiceFormData>;
  isEditing?: boolean;
}

export const InvoiceModal = ({ open, onClose, onSubmit, initialData, isEditing = false }: InvoiceModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<InvoiceFormData>({
    defaultValues: {
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (open) {
      reset({ status: "pending", date: new Date().toISOString().slice(0, 10), ...initialData });
    }
  }, [open, initialData, reset]);

  const status = watch("status");

  const onFormSubmit = (data: InvoiceFormData) => {
    onSubmit({ ...data, amount: Number(data.amount) });
    toast({ title: "Success", description: `Invoice ${isEditing ? "updated" : "created"} successfully` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Invoice" : "Create Invoice"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billNumber">Bill Number *</Label>
            <Input id="billNumber" className="bg-background/50" placeholder="e.g., B-2025-001" {...register("billNumber", { required: "Bill number is required" })} />
            {errors.billNumber && (<p className="text-sm text-destructive">{errors.billNumber.message}</p>)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" className="bg-background/50" {...register("date", { required: "Date is required" })} />
              {errors.date && (<p className="text-sm text-destructive">{errors.date.message}</p>)}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v: "paid" | "pending") => setValue("status", v)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller">Seller *</Label>
            <Input id="seller" className="bg-background/50" placeholder="e.g., Green Valley Farms" {...register("seller", { required: "Seller is required" })} />
            {errors.seller && (<p className="text-sm text-destructive">{errors.seller.message}</p>)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyer">Buyer *</Label>
            <Input id="buyer" className="bg-background/50" placeholder="e.g., Fresh Market Co." {...register("buyer", { required: "Buyer is required" })} />
            {errors.buyer && (<p className="text-sm text-destructive">{errors.buyer.message}</p>)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input id="amount" type="number" step="0.01" className="bg-background/50" placeholder="0.00" {...register("amount", { required: "Amount is required", valueAsNumber: true })} />
            {errors.amount && (<p className="text-sm text-destructive">{errors.amount.message}</p>)}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">{isEditing ? "Update" : "Create"} Invoice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};