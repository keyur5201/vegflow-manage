import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Calendar, User, DollarSign, Printer } from "lucide-react";
import { InvoiceModal, InvoiceFormData } from "@/components/InvoiceModal";
import { InvoiceViewModal } from "@/components/InvoiceViewModal";
import { useToast } from "@/hooks/use-toast";

const Invoices = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      billNumber: "B-2024-001",
      date: "2024-01-15",
      seller: "Green Valley Farms",
      buyer: "Fresh Market Co.",
      amount: 15750,
      status: "paid" as const
    },
    {
      id: "INV-002", 
      billNumber: "B-2024-002",
      date: "2024-01-16",
      seller: "Organic Gardens",
      buyer: "City Grocers",
      amount: 8900,
      status: "pending" as const
    },
    {
      id: "INV-003",
      billNumber: "B-2024-003", 
      date: "2024-01-17",
      seller: "Fresh Produce Co.",
      buyer: "Supermart Ltd.",
      amount: 22400,
      status: "paid" as const
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  const handleCreateInvoice = (data: InvoiceFormData) => {
    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      ...data
    };
    setInvoices([...invoices, newInvoice]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateInvoice = (data: InvoiceFormData) => {
    setInvoices(invoices.map(inv => 
      inv.id === editingInvoice.id ? { ...inv, ...data } : inv
    ));
    setEditingInvoice(null);
    setIsCreateModalOpen(false);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handlePrintInvoice = (invoice: any) => {
    toast({ title: "Print", description: `Printing invoice ${invoice.billNumber}` });
    // TODO: Implement actual print functionality
  };

  const openCreateModal = () => {
    setEditingInvoice(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsCreateModalOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Invoices</h1>
            <p className="text-muted-foreground">Track and manage all your sales invoices</p>
          </div>
          <Button onClick={openCreateModal} className="bg-gradient-primary hover:opacity-90 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices by bill number, seller, or buyer..."
              className="pl-10 bg-background/50"
            />
          </div>
        </Card>

        {/* Invoices List */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{invoice.billNumber}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(invoice.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Seller</p>
                      <p className="text-sm font-medium text-foreground">{invoice.seller}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Buyer</p>
                      <p className="text-sm font-medium text-foreground">{invoice.buyer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-lg font-semibold text-success">₹{invoice.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => handleViewInvoice(invoice)} variant="outline" size="sm">
                    View
                  </Button>
                  <Button onClick={() => handlePrintInvoice(invoice)} variant="ghost" size="sm">
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for when no invoices */}
        {invoices.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No invoices found</h3>
            <p className="text-muted-foreground mb-4">Start creating invoices to track your sales</p>
            <Button onClick={openCreateModal} className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Create First Invoice
            </Button>
          </Card>
        )}

        {/* Modals */}
        <InvoiceModal
          open={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingInvoice(null);
          }}
          onSubmit={editingInvoice ? handleUpdateInvoice : handleCreateInvoice}
          initialData={editingInvoice}
          isEditing={!!editingInvoice}
        />

        <InvoiceViewModal
          open={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
        />
      </div>
    </Layout>
  );
};

export default Invoices;