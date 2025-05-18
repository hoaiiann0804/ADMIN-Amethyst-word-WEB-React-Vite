import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/utils/formatCurrency";

const CartCheckoutModal = ({ isOpen, onClose, total }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận thanh toán">
      <p>
        Tổng tiền cần thanh toán: <strong>{formatCurrency(total)}</strong>
      </p>
      <p>Bạn có chắc muốn tiến hành thanh toán?</p>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={onClose}>Thanh toán</Button>
      </div>
    </Modal>
  );
};

export default CartCheckoutModal;