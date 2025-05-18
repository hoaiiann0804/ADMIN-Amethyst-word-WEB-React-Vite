import React from "react";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, Trash } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

const CartTable = ({ cartItems, onUpdateQuantity, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hình ảnh</TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Số lượng</TableHead>
          <TableHead>Tổng tiền</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                  <Trash size={16} className="text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Giỏ hàng trống
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CartTable;