import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import CartFilter from "./CartFilter";
import CartTable from "./CartTable";
import CartCheckoutModal from "./CartCheckoutModal";
import CartDeleteModal from "./CartDeleteModal";
import mockCartItems from "../../services/mockCartItems";
import { formatCurrency } from "@/utils/formatCurrency";

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Lọc sản phẩm theo tìm kiếm
  const filteredCartItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính tổng tiền
  const total = filteredCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Cập nhật số lượng
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm
  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setCartItems(cartItems.filter((item) => item.id !== itemToDelete));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý giỏ hàng</h1>
        </div>

        <CartFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <CartTable
              cartItems={filteredCartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDelete}
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Tổng tiền: {formatCurrency(total)}
              </div>
              <Button
                onClick={() => setIsCheckoutModalOpen(true)}
                disabled={filteredCartItems.length === 0}
              >
                Thanh toán
              </Button>
            </div>
          </CardContent>
        </Card>

        <CartCheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          total={total}
        />

        <CartDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Cart;