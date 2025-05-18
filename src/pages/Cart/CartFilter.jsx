import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

const CartFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-10 bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CartFilter;