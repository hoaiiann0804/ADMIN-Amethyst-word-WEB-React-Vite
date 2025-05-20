import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const ProductsGrid = ({
  products,
  formatPrice,
  onEdit,
  onDelete,
  categories,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative bg-gray-100">
            <img
              src={product.image}
              alt={product.producT_NAME}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  product.producT_STATUS === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : product.producT_STATUS === "DRAFT"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.producT_STATUS === "ACTIVE" ? "Hiển thị" : product.producT_STATUS === "DRAFT" ? "Bản nháp" : "Ẩn"}
              </span>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-white hover:bg-gray-100"
                onClick={() => onEdit(product)}
              >
                <Edit size={16} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-white hover:bg-gray-100"
                onClick={() => onDelete(product)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 mb-1">
              {categories.find(c => c.id === product.categorY_ID)?.name || "Không xác định"}
            </div>
            <h3 className="font-medium text-base mb-2 truncate">{product.producT_NAME}</h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-base">{formatPrice(product.producT_PRICE)}</span>
              <span className="text-sm text-gray-500">
                <span>Kho: </span>
                {product.stock}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};