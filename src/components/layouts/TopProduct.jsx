import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { ProductBestSeller } from "../../services/Product.Service";
export const TopProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductBestSeller();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
                  src={`https://localhost:5000/images/${product.imagE_NAME}`}
                  alt={product.producT_NAME}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{product.producT_NAME}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{product.sales} đã bán</div>
                <p className="text-xs text-gray-500">Còn {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};