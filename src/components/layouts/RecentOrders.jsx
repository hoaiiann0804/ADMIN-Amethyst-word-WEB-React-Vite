import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "clsx";

const orders = [
  {
    id: "ORD-001",
    customer: "Nguyễn Văn A",
    product: "Áo sơ mi trắng",
    totalPrice: "550.000đ",
    status: "completed",
    date: "15/05/2025",
  },
  {
    id: "ORD-002",
    customer: "Trần Thị B",
    product: "Váy đầm dạ hội",
    totalPrice: "1.200.000đ",
    status: "processing",
    date: "14/05/2025",
  },
  {
    id: "ORD-003",
    customer: "Lê Văn C",
    product: "Quần jean nam",
    totalPrice: "420.000đ",
    status: "pending",
    date: "13/05/2025",
  },
  {
    id: "ORD-004",
    customer: "Phạm Thị D",
    product: "Áo khoác nữ",
    totalPrice: "750.000đ",
    status: "cancelled",
    date: "12/05/2025",
  },
];

function getStatusStyle(status) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

function getStatusText(status) {
  switch (status) {
    case "completed":
      return "Hoàn thành";
    case "processing":
      return "Đang xử lý";
    case "pending":
      return "Chờ xác nhận";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
}

function RecentOrders() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Đơn hàng gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Ngày đặt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="text-right">{order.totalPrice}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={clsx("font-normal", getStatusStyle(order.status))}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentOrders;
