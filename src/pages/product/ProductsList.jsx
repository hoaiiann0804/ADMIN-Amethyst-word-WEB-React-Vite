import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Edit, Trash2 } from "lucide-react";

export const ProductsList = ({
  products,
  formatPrice,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <div className="divide-y">
        {products.map((product) => (
          <div key={product.producT_ID} className="flex items-center p-4 gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
              <img
                src={`https://localhost:5000/images/${product.imagE_NAME}`}
                alt={product.producT_NAME}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{product.producT_NAME}</h3>
              {/* <div className="text-sm text-gray-500">{product.category}</div> */}
            </div>
            <div className="hidden md:block text-right">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  product.producT_STATUS === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.producT_STATUS}
              </span>
            </div>
            <div className="text-right">
              <div className="font-bold">{formatPrice(product.producT_PRICE)}</div>
              <div className="text-sm text-gray-500">
                <span>Kho: </span>
                {product.quantity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => onEdit(product)}
              >
                <Edit size={18} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => onDelete(product)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
