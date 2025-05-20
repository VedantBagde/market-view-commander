
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderDetails {
  type: "buy" | "sell";
  orderType: "market" | "limit";
  symbol: string;
  amount: string;
  price: string;
  total: string;
}

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  order: OrderDetails | null;
}

export function OrderConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  order,
}: OrderConfirmationDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm {order.type.toUpperCase()} Order</DialogTitle>
          <DialogDescription>
            Please review your order details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-muted-foreground">Type</div>
            <div className="font-medium">
              {order.orderType === "market" ? "Market Order" : "Limit Order"}
            </div>
            
            <div className="text-muted-foreground">Asset</div>
            <div className="font-medium">{order.symbol}</div>
            
            <div className="text-muted-foreground">Amount</div>
            <div className="font-medium">{order.amount} {order.symbol}</div>
            
            <div className="text-muted-foreground">Price</div>
            <div className="font-medium">
              ${order.price}
              {order.orderType === "limit" ? " (limit)" : ""}
            </div>
            
            <div className="text-muted-foreground">Total</div>
            <div className="font-medium">${order.total}</div>
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className={order.type === "buy" ? "bg-crypto-green hover:bg-crypto-green/90" : "bg-crypto-red hover:bg-crypto-red/90"}
          >
            Confirm {order.type}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default OrderConfirmationDialog;
