import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface InvoiceViewModalProps {
  open: boolean;
  onClose: () => void;
  invoice?: {
    billNumber: string;
    date: string;
    seller: string;
    buyer: string;
    amount: number;
    status: "paid" | "pending";
  };
}

export const InvoiceViewModal = ({ open, onClose, invoice }: InvoiceViewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Invoice Details</DialogTitle>
        </DialogHeader>
        {!invoice ? (
          <p className="text-muted-foreground">No invoice selected</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bill Number</p>
                <p className="text-lg font-semibold">{invoice.billNumber}</p>
              </div>
              <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date(invoice.date).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Seller</p>
              <p className="font-medium">{invoice.seller}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Buyer</p>
              <p className="font-medium">{invoice.buyer}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold text-success">₹{invoice.amount.toLocaleString()}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};