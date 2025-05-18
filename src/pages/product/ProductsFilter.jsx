import React, { useState } from "react";
import { Search, Filter, LayoutGrid, ListIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export const ProductsFilter = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  categories,
  selectedCategory,
  setSelectedCategory,
  onApplyFilter,
  priceRange,
  setPriceRange
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleApply = () => {
    if (onApplyFilter) {
      onApplyFilter({
        category: selectedCategory,
        priceRange: localPriceRange
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={18} />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <ListIcon size={18} />
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                <span>Bộ lọc</span>
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Danh mục</h4>
                  <RadioGroup 
                    value={selectedCategory || ""}
                    onValueChange={setSelectedCategory}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="category-all" />
                      <Label htmlFor="category-all">Tất cả danh mục</Label>
                    </div>
                    {categories?.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.name} id={`category-${category.id}`} />
                        <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Khoảng giá</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="minPrice">Giá tối thiểu</Label>
                      <Input 
                        type="number" 
                        id="minPrice" 
                        placeholder="0" 
                        value={localPriceRange.min}
                        onChange={(e) => setLocalPriceRange({...localPriceRange, min: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxPrice">Giá tối đa</Label>
                      <Input 
                        type="number" 
                        id="maxPrice" 
                        placeholder="10,000,000" 
                        value={localPriceRange.max}
                        onChange={(e) => setLocalPriceRange({...localPriceRange, max: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedCategory("");
                      setLocalPriceRange({ min: "", max: "" });
                    }}
                  >
                    Đặt lại
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleApply}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};