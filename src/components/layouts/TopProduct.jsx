import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const TopProducts = () => {
  const products = [
    {
      name: "Áo sơ mi trắng",
      category: "Áo",
      sales: 120,
      stock: 45,
      image: "https://via.placeholder.com/40x40",
    },
    {
      name: "Váy dạ hội đen",
      category: "Váy",
      sales: 98,
      stock: 12,
      image: "https://via.placeholder.com/40x40",
    },
    {
      name: "Quần jean nam",
      category: "Quần",
      sales: 87,
      stock: 34,
      image: "https://via.placeholder.com/40x40",
    },
    {
      name: "Giày thể thao",
      category: "Giày",
      sales: 76,
      stock: 23,
      image: "https://via.placeholder.com/40x40",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sản phẩm bán chạy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{product.sales} đã bán</div>
                <p className="text-xs text-gray-500">Còn {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};